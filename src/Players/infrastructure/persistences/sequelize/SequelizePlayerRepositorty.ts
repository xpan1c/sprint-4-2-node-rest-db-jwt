import { literal, ModelAttributes, QueryTypes, Sequelize } from "sequelize";

import { GameWin } from "../../../../Games/domain/GameWin";
import { SequelizeGameRepository } from "../../../../Games/infrastructure/persistences/sequelize/SequelizeGameRepository";
import { InvalidArgumentError } from "../../../../shared/domain/value-object/InvalidArgumentError";
import { SequelizeRepository } from "../../../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { Player } from "../../../domain/Player";
import { PlayerId } from "../../../domain/PlayerId";
import { PlayerName } from "../../../domain/PlayerName";
import { PlayerRepository } from "../../../domain/PlayerRepository";
import { PlayerInstance } from "./PlayerInstance";
import { PlayerQueryResult } from "./PlayerQueryResult";

export class SequelizePlayerRepository extends SequelizeRepository implements PlayerRepository {
	constructor(sequelize: Sequelize) {
		super(sequelize);
		const PlayerModel = this.repository();
		const GameModel = new SequelizeGameRepository(sequelize).repository();
		PlayerModel.hasMany(GameModel, { foreignKey: "playerId" });
		GameModel.belongsTo(PlayerModel, { foreignKey: "playerId" });
		this.sequelize.sync();
	}

	async create(player: Player): Promise<void> {
		if (await this.findByName(player.name)) {
			throw new InvalidArgumentError("Player's name already exist");
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			await this.repository().create(player.toPrimitives());
		}
	}

	async update(player: Player): Promise<void> {
		const id = player.id.value;
		const name = player.name.value;
		await this.repository().update({ name }, { where: { id } });
	}

	async findById(_id: PlayerId): Promise<Player | null> {
		const player = await this.repository().findByPk(_id.value);

		if (player === null) {
			throw new InvalidArgumentError("Player id does not exist");
		}
		const { id, name } = player.dataValues;

		return Player.fromPrimitives({
			id,
			name,
		});
	}

	async findByName(name: PlayerName): Promise<Player | null> {
		const player = await this.repository().findOne({ where: { name: name.value } });

		return player
			? Player.fromPrimitives({
					id: player.get("id") as string,
					name: player.get("name") as string,
			  })
			: null;
	}

	async findAll(): Promise<Player[] | null> {
		const playersFromPersistence = await this.repository().findAll();
		const players = playersFromPersistence.map((player) =>
			Player.fromPrimitives({
				id: player.get("id") as string,
				name: player.get("name") as string,
			})
		);

		return players.length !== 0 ? players : null;
	}

	async findWithWinRate(): Promise<Array<{ player: Player; winRate: number }>> {
		const playersData = await this.repository().findAll({
			include: [
				{
					model: this.sequelize.models["games"],
					attributes: [],
				},
			],
			group: ["players.id"],
			attributes: [
				"id",
				"name",
				[
					literal(
						`CASE WHEN COUNT(*) = 0 THEN 0 ELSE (SELECT COUNT(*) FROM games WHERE games.playerId = players.id AND games.win = true) / COUNT(*) * 100 END`
					),
					"winRate",
				],
			],
		});

		return playersData.map((playerData) => {
			const player = Player.fromPrimitives({
				id: playerData.get("id") as string,
				name: playerData.get("name") as string,
			});
			const winRate = parseFloat(playerData.get("winRate") as string);

			return {
				player,
				winRate,
			};
		});
	}

	async findRanking(): Promise<Array<{ player: Player; winRate: number; averageWinRate: number }>> {
		// Primero, encuentra todos los jugadores y su winRate, y ordena por winRate en orden descendente
		const playersData = await this.repository().findAll({
			include: [
				{
					model: this.sequelize.models["games"],
					attributes: [],
				},
			],
			group: ["players.id"],
			attributes: [
				"id",
				"name",
				[
					this.sequelize.literal(
						`CASE WHEN COUNT(*) = 0 THEN 0 ELSE (SELECT COUNT(*) FROM games WHERE games.playerId = players.id AND games.win = true) / COUNT(*) * 100 END`
					),
					"winRate",
				],
			],
			order: [[this.sequelize.literal("winRate"), "DESC"]],
		});

		const players: Array<{ player: Player; winRate: number; averageWinRate: number }> =
			playersData.map((playerData) => ({
				player: Player.fromPrimitives({
					id: playerData.get("id") as string,
					name: playerData.get("name") as string,
				}),
				winRate: Number(playerData.get("winRate")),
				averageWinRate: 0,
			}));

		const totalWinRate = players.reduce((total, player) => total + player.winRate, 0);
		const averageWinRate = players.length ? totalWinRate / players.length : 0;

		players.forEach((player) => {
			player.averageWinRate = averageWinRate;
		});

		return players;
	}

	async findWinnerOrLoser(winner: GameWin): Promise<{ player: Player; winRate: number }> {
		const results: PlayerQueryResult[] = await this.sequelize.query(
			`
		  SELECT 
			  players.id,
			  players.name, 
			  CASE 
				  WHEN COUNT(*) = 0 
				  THEN 0 
				  ELSE (
					  SELECT COUNT(*) 
					  FROM games 
					  WHERE games.playerId = players.id 
					  AND games.win = 1
				  ) / COUNT(*) * 100 
			  END AS winRate
		  FROM 
			  players
		  LEFT JOIN 
			  games ON players.id = games.playerId
		  GROUP BY 
			  players.id
		  ORDER BY 
			  winRate ${winner.value ? "DESC" : "ASC"}
		  LIMIT 1
		`,
			{ type: QueryTypes.SELECT }
		);

		if (results.length === 0) {
			throw new Error("No players found");
		}

		const { id, name, winRate } = results[0];
		const player = Player.fromPrimitives({ id, name });

		return { player, winRate: parseFloat(winRate) };
	}

	protected entityInstance(): ModelAttributes {
		return PlayerInstance;
	}

	protected instanceName(): string {
		return "players";
	}
}
