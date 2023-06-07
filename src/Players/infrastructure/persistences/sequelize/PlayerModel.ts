import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	ModelAttributes,
} from "sequelize";

import { sequelize } from "../../../../shared/infrastructure/persistence/config/sequelize.config";

// eslint-disable-next-line no-use-before-define
export class Players extends Model<InferAttributes<Players>, InferCreationAttributes<Players>> {
	declare id: string;
	declare name: string;
}
export const PlayerInstance: ModelAttributes = {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};
Players.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, tableName: "players", timestamps: false }
);
