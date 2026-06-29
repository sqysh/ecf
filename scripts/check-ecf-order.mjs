import prisma from "../prisma/client.ts";
// All orders for this customer's email, newest first
const orders = await prisma.order.findMany({
  where: { customerEmail: "rowgregory@gmail.com" },
  orderBy: { createdAt: "desc" },
  select: {
    id: true,
    totalAmount: true,
    status: true,
    userId: true,
    stripeSubscriptionId: true,
    paymentIntentId: true,
    createdAt: true,
  },
});

console.log("Total orders found:", orders.length);
console.log(JSON.stringify(orders, null, 2));
await prisma.$disconnect();
