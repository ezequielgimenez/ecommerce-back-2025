import { MercadoPagoConfig, Preference, MerchantOrder } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_TOKEN,
});

const preference = new Preference(client);
const merchantOrder = new MerchantOrder(client);

export async function createSinglePreference(product, user) {
  return await preference.create({
    body: {
      items: [
        {
          id: product.objectID,
          title: product.name,
          description: product.description,
          quantity: 1,
          currency_id: "ARS",
          unit_price: product.price,
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
      external_reference: user.id,
      notification_url:
        "https://webhook.site/4d3b832c-8853-48b1-9f38-02003a34b8ed",
    },
  });
}

export async function getMerchantOrder(id) {
  const result = await merchantOrder.get(id);
  return result;
}
