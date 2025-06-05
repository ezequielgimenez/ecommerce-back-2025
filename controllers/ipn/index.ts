import { getMerchantOrder } from "lib/mercadopago";

export async function ipnController(req) {
  const { id, type } = req;
  if (id) {
    return { success: true, id, type };
  } else {
    return { success: false };
  }
}
