import { Model, Sequelize } from "sequelize";

export abstract class SequelizeRepository<T extends Model> {
	constructor(protected sequelize: Sequelize) {}

	async persist(modelInstance: T): Promise<void> {
		await modelInstance.save();
	}
}
