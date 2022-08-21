import nodemailer from "nodemailer";

export async function sendVerificationEmail(to: string, link: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: to,
    subject: "ACM at CSUF Discord verification",
    html: `
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td style="text-align: center">
            <h1>Welcome to ACM at CSUF!</h1>
            <div>Click the link below to complete the registration process</div>
            <br />
            <br />
            <a
              style="
                font-family: Arial, sans-serif;
                font-size: 20px;
                line-height: 20px;
                color: #ffffff;
                border-width: 0px;
                border-color: #ffffff;
                border-style: solid;
                border-radius: 12px;
                background-color: 2c91c6;
                padding: 15px;
                text-decoration: none;
              "
              href="${link}"
            >
              Verify your email
            </a>
            <br />
            <br />
            <br />
            <br />
            <br />
            If you're having trouble clicking the button, copy paste the following URL
            into your browser: <a href=${link}>${link}</a>
          </td>
        </tr>
      </table>
    `,
  });
  console.debug("Message sent: %s", info.messageId);
}
