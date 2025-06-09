import { sequelize } from "connections";
import { DataTypes } from "sequelize";

export const Transaction = sequelize.define("transaction", {
  status: DataTypes.STRING,
  productId: DataTypes.STRING,
});
