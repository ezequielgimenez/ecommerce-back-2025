import { findOneUserByPk, updateUserById } from "services/user.services";
import { decodeToken } from "lib/generateToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAllTransactions } from "services/transation.services";

export function getMeMiddleware(callback) {
  return async function getDecode(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token").value;

    if (token) {
      const data = decodeToken(token);
      if (data) {
        return callback(req, data);
      } else {
        return NextResponse.json(
          { success: false, message: "Token invalido" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: "No hay un token en el headers" },
        { status: 404 }
      );
    }
  };
}

export async function getMeController(data) {
  const { userId } = data;
  const user = await findOneUserByPk(userId);
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

export async function getAllMeTransactions(userId) {
  const productsPaid = await getAllTransactions(userId);
  if (productsPaid.length > 0) {
    return {
      sucess: true,
      message: "Tus compras realizadas",
      data: productsPaid,
    };
  } else {
    return {
      success: false,
      message: "Aún no tenes compras realizadas",
    };
  }
}

export async function updateUserController(data) {
  const { id } = data;
  const [user] = await updateUserById(data, id);
  if (user === 1) {
    return { success: true, message: "Usuario actualizado" };
  } else {
    return { success: false, message: "No se pudo actualizar el user" };
  }
}
