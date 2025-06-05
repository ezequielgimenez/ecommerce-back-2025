import { algolia } from "connections";
import { createSinglePreference } from "lib/mercadopago";
import { Transaction } from "models/transaction";
import { User } from "models/user";

export async function createTransaction(req) {
  const { productId, email } = req;
  const user = await User.findOne({ where: { email } });

  if (user && productId) {
    await Transaction.create({ status: "pending", userId: user.get("id") });

    const product = await algolia.getObject({
      indexName: "products",
      objectID: productId,
    });
    if (product) {
      const data = await createSinglePreference(product, user);
      return { success: true, message: "Preferencia creada", data };
    } else {
      return { success: false, message: "Producto no encontrado" };
    }
  } else {
    return { success: false, message: "No hay user o productId" };
  }
}
