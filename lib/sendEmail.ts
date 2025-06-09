import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // o el servicio que estés usando
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASS,
  },
});

// Función para validar email
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export async function sendEmail(email, code) {
  if (!email || !isValidEmail(email)) {
    return {
      success: false,
      message: "Debe proporcionar un email válido",
    };
  } else {
    return await transporter.sendMail({
      to: email,
      subject: "Tu código para ingresar",
      html: `
                <head>
        <style>
           @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
            body {
              font-family: "Poppins", sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 20px;
            }

            .container {
              background-color: #f2f2f2;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              text-align: center;
            }

            h1 {
              color: #333333;
            }

            .code {
              font-size: 24px;
              font-weight: 600;
              color: #ff6600;
            }

            .logo {
              margin-bottom: 20px;
            }
          </style>
        </head>
      <body>
          <div class="container">
            <!-- Logo o imagen -->
            <img src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1729558762/Ecommerce%20logo%20send%20email/levo3bzftblnc2icczlc.png" alt="Modakelar Logo" class="logo" width="150" />

            <!-- Contenido del correo -->
            <h1>Tu código para ingresar:</h1>
            <h3 class="code">${code}</h3>
          </div>
      </body>
      `,
    });
  }
}
