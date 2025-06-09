import { User } from "models/user";
import { Auth } from "models/auth";
import { createUserAuth, findOneUserById } from "services/user.services";
import { verifyEmailWithHunter } from "lib/verifyEmail";
import { generateToken } from "lib/generateToken";
import { sendEmail } from "lib/sendEmail";
import { findAuthByEmail } from "services/auth.services";

export async function authController(data) {
  try {
    const { email } = data;
    const info = await verifyEmailWithHunter(email);

    if (info.data.result !== "deliverable") {
      throw new Error("Email inexistente, usa un correo electrónico válido");
    }

    const response = await createUserAuth(email);
    await sendEmail(email, response.code);
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function authTokenController(data) {
  const { email, code } = data;
  const auth = await findAuthByEmail(email);
  if (auth) {
    const codeOfAuth = auth.get("code");
    const expireOfAuth = auth.get("expires");
    const now = new Date();
    if (codeOfAuth === code && now < expireOfAuth) {
      const id = auth.get("userId");
      const user = await findOneUserById(id.toString());
      const token = generateToken({ userId: user.get("id") });
      return { success: true, message: "Código y email son correctos", token };
    } else {
      return { success: false, message: "Código incorrecto o expirado" };
    }
  } else {
    return { success: false, message: "No se encontro un user con ese email" };
  }
}
