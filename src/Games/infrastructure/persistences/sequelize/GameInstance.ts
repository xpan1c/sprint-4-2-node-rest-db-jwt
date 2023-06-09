import { DataTypes, ModelAttributes } from "sequelize";

export const GameInstance: ModelAttributes = {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	playerId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	diceOne: { type: DataTypes.INTEGER, allowNull: false },
	diceTwo: { type: DataTypes.INTEGER, allowNull: false },
	result: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	win: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
};
