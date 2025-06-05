import { User } from "models/user";
import { Auth } from "models/auth";
import { addMinutes } from "date-fns";
import seedRandom from "random-seed";
import { generateToken } from "lib/generateToken";
import { verifyEmailWithHunter } from "lib/verifyEmail";

export async function authController(data) {
  const { email } = data;
  const info = await verifyEmailWithHunter(email);

  if (info.data.result !== "deliverable") {
    throw new Error("Email inexistente, usa un correo electrónico válido");
  }

  const emailModified = email.trim().toLowerCase();
  const expires = addMinutes(new Date(), 30);
  const randomNum = seedRandom.create();
  const code = randomNum.intBetween(1000, 9999);
  const [user, userCreated] = await User.findOrCreate({
    where: {
      email: emailModified,
    },
    defaults: {
      email: emailModified,
    },
  });
  if (userCreated) {
    await Auth.create({
      email: emailModified,
      code,
      expires,
      userId: user.get("id"),
    });
    return {
      success: true,
      message:
        "Te has registrado, introduce el código que te enviamos al email",
    };
  }
  if (user) {
    await Auth.update({ code, expires }, { where: { email } });
    return {
      success: true,
      message: "Introduce el código que te enviamos al email",
    };
  }
  console.log("Codigo enviado");
  console.log("Codigo enviado");
  console.log("Codigo enviado");
  console.log("Codigo enviado");
  console.log("Codigo enviado");
  console.log("Codigo enviado");
}

export async function tokenController(data) {
  const { email, code } = data;
  const auth = await Auth.findOne({ where: { email } });
  if (auth) {
    const codeAuth = auth.get("code");
    const expireAuth = auth.get("expires");
    const now = new Date();
    if (code === codeAuth && now < expireAuth) {
      const userId = auth.get("userId");
      const user = await User.findOne({ where: { id: userId } });
      const token = generateToken({ userId: user.get("id") });
      return {
        success: true,
        message: "Token generado",
        token,
      };
    } else {
      return {
        success: false,
        message: "Código incorrecto o expirado",
      };
    }
  } else {
    return {
      success: false,
      message: "Email no registrado",
    };
  }
}
