import { sequelize } from "connections";
import { DataTypes } from "sequelize";

export const User = sequelize.define("user", {
  name: DataTypes.STRING,
  surname: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.JSON,
  identification: DataTypes.JSON,
  address: DataTypes.JSON,
});
