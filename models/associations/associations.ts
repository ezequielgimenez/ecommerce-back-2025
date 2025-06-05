// import { Product } from "models/products";
import { Transaction } from "models/transaction";
import { User } from "models/user";

User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

export { User, Transaction };
