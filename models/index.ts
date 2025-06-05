import { sequelize } from "connections";
import "./auth";
import "./associations/associations";

export default async function syncDB() {
  if (process.env.NODE_ENV === "development") {
    const res = await sequelize.sync({ force: true });
    console.log(res);
  }
}
