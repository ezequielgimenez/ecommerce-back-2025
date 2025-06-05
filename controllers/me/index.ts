import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { decodeToken } from "lib/generateToken";
import { User } from "models/user";

export function getMeMiddleware(callback) {
  return function getDecode(req: NextApiRequest, res: NextApiResponse) {
    const tokenReq = parseBearerToken(req);
    if (tokenReq) {
      const data = decodeToken(tokenReq);
      if (data) {
        callback(req, res, data);
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Token invalido" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No hay un token" });
    }
  };
}

export async function getMeController(data) {
  const { userId } = data;
  const user = await User.findByPk(userId);
  if (user) {
    return {
      success: true,
      message: "User autenticado y encontrado",
      data: user,
    };
  } else {
    return {
      success: false,
      message: "User no encontrado por el id proporcionado",
    };
  }
}
