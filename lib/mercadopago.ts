import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_TOKEN,
});

const preference = new Preference(client);
const payment = new Payment(client);

export type myObjectData = {
  product: {
    objectID: string;
    name: string;
    description: string;
  };
  user: {
    email: string;
    name: string;
    surname: string;
    address: {
      street_name: string;
      street_number: number;
    };
  };
  transaction: {
    id: string;
    status: string;
    productId: string;
  };
};

export async function createSinglePreference(data: myObjectData) {
  const { product, user, transaction } = data;
  return await preference.create({
    body: {
      items: [
        {
          id: product.objectID,
          title: product.name,
          description: product.description,
          quantity: 1,
          currency_id: "ARS",
          unit_price: 5,
        },
      ],
      payer: {
        email: user.email,
      },
      // URL de redirección en los distintos casos
      back_urls: {
        success: "https://test.com/success",
        failure: "https://test.com/failure",
        pending: "https://test.com/pending",
      },
      // Esto puede ser el id o algún otro identificador
      // que te ayude a vincular este pago con el producto más adelante
      external_reference: transaction.id,
      notification_url:
        "https://webhook.site/02813db2-b7c7-4137-a00c-ab163fd3eb0f",
    },
  });
}

export async function getPaymentById(id: string) {
  return payment.get({ id });
}
