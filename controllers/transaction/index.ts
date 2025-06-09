import { createTransaction } from "services/transation.services";
import { findOneUserByEmail } from "services/user.services";
import { createSinglePreference } from "lib/mercadopago";
import { getProductById } from "services/product.services";

import { myObjectData } from "lib/mercadopago";

export async function createTransactionController(
  productId: string,
  email: string
) {
  const user = await findOneUserByEmail(email);
  if (user) {
    const status = "pending";
    const userId = user.get("id").toString();
    const transaction = await createTransaction(status, userId, productId);
    const productById = await getProductById(productId);
    const product = JSON.parse(JSON.stringify(productById));

    const data: myObjectData = {
      user: user.toJSON(),
      product,
      transaction: transaction.toJSON(),
    };
    const prefence = await createSinglePreference(data);
    return {
      success: true,
      message: "Transaccion creada",
      data: prefence.init_point,
    };
  } else {
    return { success: false, message: "Email de usuario no encontrado" };
  }
}
