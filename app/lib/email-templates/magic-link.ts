export const magicLinkTemplate = (url: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Sign in to Education Comes First</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .bg-page { background-color: #1a1a1a !important; }
      .bg-card { background-color: #131411 !important; }
      .border-c { border-color: #262525 !important; }
      .text-primary { color: #ffffff !important; }
      .text-secondary { color: rgba(255,255,255,0.6) !important; }
      .text-muted { color: rgba(255,255,255,0.4) !important; }
      .text-faint { color: rgba(255,255,255,0.25) !important; }
      .text-accent { color: #c9f31f !important; }
      .bg-traffic { background-color: rgba(255,255,255,0.02) !important; }
      .border-traffic { border-color: #262525 !important; }
      .url-text { color: #11d1ff !important; }
    }
  </style>
</head>
<body class="bg-page" style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg-page" style="background-color: #ffffff;">
    <tr>
      <td style="padding: 48px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 480px; margin: 0 auto;">

          <!-- Brand strip -->
          <tr>
            <td style="padding: 0 0 32px 0; text-align: center;">
              <p class="text-accent" style="margin: 0 0 8px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #131411; font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;">
                Education Comes First
              </p>
              <h1 class="text-primary" style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.02em; color: #000000;">
                Sign in to your account
              </h1>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td class="bg-card border-c" style="background-color: #ffffff; border: 1px solid #f0e6db;">

              <!-- Content -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 36px 28px 28px 28px;">

                    <!-- Eyebrow -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                      <tr>
                        <td style="vertical-align: middle;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 16px; height: 1px; background-color: #131411; font-size: 0; line-height: 0;" class="border-c">&nbsp;</td>
                              <td style="width: 10px;">&nbsp;</td>
                              <td class="text-primary" style="font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #000000; white-space: nowrap;">
                                Magic link
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Heading -->
                    <h2 class="text-primary" style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; letter-spacing: -0.01em; color: #000000; line-height: 1.2;">
                      Your sign-in link is ready
                    </h2>

                    <!-- Description -->
                    <p class="text-secondary" style="margin: 0 0 28px 0; font-size: 14px; color: rgba(0,0,0,0.6); line-height: 1.6;">
                      Click the button below to securely sign in. This link expires in <span class="text-primary" style="color: #000000; font-weight: 600;">15 minutes</span> and can only be used once.
                    </p>

                    <!-- CTA -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                      <tr>
                        <td style="background-color: #000000;">
                          <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 28px; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; letter-spacing: 0.01em;">
                            Sign in →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                      <tr>
                        <td class="border-c" style="height: 1px; background-color: #f0e6db; font-size: 0; line-height: 0;">&nbsp;</td>
                      </tr>
                    </table>

                    <!-- Fallback URL -->
                    <p class="text-muted" style="margin: 0 0 8px 0; font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(0,0,0,0.4);">
                      Button not working?
                    </p>
                    <p style="margin: 0 0 20px 0; word-break: break-all;">
                      <a href="${url}" class="url-text" style="font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace; font-size: 11px; color: #00a2d1; text-decoration: none; line-height: 1.6;">${url}</a>
                    </p>

                    <!-- Security note -->
                    <p class="text-muted" style="margin: 0; font-size: 12px; color: rgba(0,0,0,0.5); line-height: 1.6;">
                      <span class="text-secondary" style="color: rgba(0,0,0,0.7); font-weight: 500;">Didn't request this?</span> You can safely ignore this email — your account won't be affected.
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0 0 0; text-align: center;">
              <p class="text-faint" style="margin: 0; font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(0,0,0,0.3);">
                © 2026 Education Comes First
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

export default magicLinkTemplate
