import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";

dotenv.config();
const username = process.env.MYSQL_USER ?? "";
const password = process.env.MYSQL_PASSWORD ?? "";
const database = process.env.DATABASE_NAME ?? "";
export const logBuffer: string[] = [];
const dialect: Dialect = "mysql";
const options = { dialect, logging: true };
if (process.env.NODE_ENV !== "dev") {
	options.logging = false;
}
export const sequelize = new Sequelize(database, username, password, options);
