import { getPaymentById } from "lib/mercadopago";
import { updatePaymentTransaction } from "services/transation.services";

export async function ipnController(id: string) {
  const payment = await getPaymentById(id);
  const [updatePayment] = await updatePaymentTransaction(
    payment.external_reference
  );
  if (updatePayment === 1) {
    return {
      success: true,
      message: "Pago encontrado y actualizado",
      transactionId: payment.external_reference,
      data: payment,
    };
  } else {
    return {
      success: false,
      message: "No se pudo actualizar el pago",
      data: payment,
    };
  }
}
