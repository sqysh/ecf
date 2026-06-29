// scripts/backfill-missing-order.ts
// One-time backfill for a real recurring donation that succeeded on Stripe
// but failed to record in the DB (unique-constraint crash, now fixed).
// Run once, then delete. Does NOT send a confirmation email.

import prisma from "../prisma/client.ts";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

const INVOICE_ID = "in_1TmgUNE2eqZhd2FlnRVoOHeP"; // the missing donation's invoice

async function main() {
  console.log("key present:", !!process.env.STRIPE_SECRET_KEY);
  console.log("node version:", process.version);
  const invoice = await stripe.invoices.retrieve(INVOICE_ID);

  const subscriptionId =
    invoice.parent?.subscription_details?.subscription ?? null;
  if (!subscriptionId) throw new Error("No subscription on this invoice");

  // Guard: don't double-insert if it already exists
  const existing = await prisma.order.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });
  if (existing) {
    console.log("Order already exists, nothing to do:", existing.id);
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  });

  // PaymentIntent id for this invoice
  let paymentIntentId = null;
  const invoicePayments = await stripe.invoicePayments.list({
    invoice: invoice.id,
  });
  const defaultPayment = invoicePayments.data.find((p) => p.is_default);
  if (defaultPayment?.payment?.type === "payment_intent") {
    paymentIntentId =
      typeof defaultPayment.payment.payment_intent === "string"
        ? defaultPayment.payment.payment_intent
        : (defaultPayment.payment.payment_intent?.id ?? null);
  }

  const paymentMethodId =
    typeof subscription.default_payment_method === "string"
      ? subscription.default_payment_method
      : (subscription.default_payment_method?.id ?? null);

  const userId = subscription.metadata?.userId;
  const validUserId = userId && userId !== "guest" ? userId : null;
  const frequency = subscription.metadata?.frequency || "monthly";
  const amount = invoice.amount_paid / 100;
  const coverFees = subscription.metadata?.coverFees === "true";
  const feesCovered = parseFloat(subscription.metadata?.feesCovered || "0");

  const anchor = new Date(subscription.billing_cycle_anchor * 1000);
  const nextBillingDate =
    frequency === "yearly"
      ? new Date(anchor.setFullYear(anchor.getFullYear() + 1))
      : new Date(anchor.setMonth(anchor.getMonth() + 1));

  const order = await prisma.order.create({
    data: {
      type: "RECURRING_DONATION",
      status: "CONFIRMED",
      totalAmount: amount,
      paymentMethod: "stripe",
      customerEmail:
        subscription.metadata?.email || invoice.customer_email || "",
      customerName: subscription.metadata?.name || "",
      userId: validUserId,
      stripeSubscriptionId: subscriptionId,
      paymentIntentId,
      paymentMethodId,
      isRecurring: true,
      recurringFrequency: frequency,
      coverFees,
      feesCovered,
      paidAt: invoice.status_transitions?.paid_at
        ? new Date(invoice.status_transitions.paid_at * 1000)
        : new Date(),
      nextBillingDate,
    },
  });

  console.log(
    "Backfilled order:",
    order.id,
    "for",
    amount,
    "sub",
    subscriptionId,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
