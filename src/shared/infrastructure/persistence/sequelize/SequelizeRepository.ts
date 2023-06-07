import { Model, ModelAttributes, ModelStatic, Sequelize } from "sequelize";

export abstract class SequelizeRepository {
	constructor(protected sequelize: Sequelize) {
		this.sequelize.define(this.instanceName(), this.entityInstance(), { timestamps: false });
	}

	protected abstract entityInstance(): ModelAttributes;
	protected abstract instanceName(): string;
	/* async persist(modelInstance: T): Promise<void> {
		await modelInstance.save();
	} */

	protected repository(): ModelStatic<Model> {
		const modelName = this.instanceName();

		return this.sequelize.models[modelName];
	}
}
