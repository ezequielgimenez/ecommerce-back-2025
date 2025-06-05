import { sequelize } from "connections";
import { DataTypes } from "sequelize";

export const Auth = sequelize.define("auth", {
  email: DataTypes.STRING,
  code: DataTypes.INTEGER,
  expires: DataTypes.DATE,
  userId: DataTypes.INTEGER,
});
