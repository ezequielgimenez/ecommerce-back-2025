import { sequelize } from "connections";
import { DataTypes } from "sequelize";

export const Product = sequelize.define("product", {
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  description: DataTypes.TEXT,
  stock: DataTypes.STRING,
  marca: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  type: DataTypes.STRING,
  prodDest: DataTypes.STRING,
});
