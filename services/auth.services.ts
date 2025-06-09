import { Auth } from "models/associations";

export async function findAuthByEmail(email: string) {
  const auth = await Auth.findOne({ where: { email } });
  return auth;
}
