import { sequelize } from "connections";
import "./auth";
import "./associations";

export default async function syncDB() {
  if (process.env.NODE_ENV === "development") {
    const res = await sequelize.sync({ alter: true });
    console.log(res);
  }
}
