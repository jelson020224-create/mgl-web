export async function sendVerificationEmail(email: string, code: string): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    console.log(`[DEV EMAIL] To: ${email} — Your verification code is: ${code}`)
    return true
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'MGL Construction <verify@mglconstruction.com>',
        to: email,
        subject: 'Verify your email — MGL Construction',
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
            <h2 style="color:#2C2C2C;">Verify your email</h2>
            <p style="color:#6B6B6B;">Use the code below to complete your registration:</p>
            <div style="background:#f7f5f3;padding:1.5rem;border-radius:0.75rem;text-align:center;margin:1.5rem 0;">
              <span style="font-size:2rem;font-weight:700;letter-spacing:0.25em;color:#C76A4E;">${code}</span>
            </div>
            <p style="color:#9C9C9C;font-size:0.875rem;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
          </div>
        `,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}
