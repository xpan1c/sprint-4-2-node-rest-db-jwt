import { Model, ModelAttributes, ModelStatic, Sequelize } from "sequelize";

export abstract class SequelizeRepository {
	constructor(protected sequelize: Sequelize) {}
	protected abstract entityInstance(): ModelAttributes;
	protected abstract instanceName(): string;
	/* async persist(modelInstance: T): Promise<void> {
		await modelInstance.save();
	} */

	protected repository(): ModelStatic<Model> {
		const modelName = this.instanceName();
		const modelInstance = this.entityInstance();
		this.sequelize.define(modelName, modelInstance, { timestamps: false });

		return this.sequelize.models[modelName];
	}
}
