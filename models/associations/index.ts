import { Transaction } from "models/transaction";
import { User } from "models/user";
import { Auth } from "models/auth";
User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

export { User, Transaction, Auth };
