import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { sequelize } from "../../../../shared/infrastructure/persistenceConfig/sequelize.config";

// eslint-disable-next-line no-use-before-define
export class Players extends Model<InferAttributes<Players>, InferCreationAttributes<Players>> {
	declare id: string;
	declare name: string;
}
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

	{ sequelize, tableName: "players" }
);
