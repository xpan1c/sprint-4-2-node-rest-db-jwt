import { ModelAttributes } from "sequelize";

import { InvalidArgumentError } from "../../../../shared/domain/value-object/InvalidArgumentError";
import { SequelizeRepository } from "../../../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { Player } from "../../../domain/Player";
import { PlayerId } from "../../../domain/PlayerId";
import { PlayerName } from "../../../domain/PlayerName";
import { PlayerRepository } from "../../../domain/PlayerRepository";
import { PlayerInstance } from "./PlayerInstance";

export class SequelizePlayerRepository extends SequelizeRepository implements PlayerRepository {
	async create(player: Player): Promise<void> {
		await this.sequelize.sync();
		if (await this.findByName(player.name)) {
			throw new InvalidArgumentError("Player's name already exist");
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			await this.repository().create(player.toPrimitives());
		}
	}

	async update(player: Player): Promise<void> {
		await this.sequelize.sync();
		const id = player.id.value;
		const name = player.name.value;
		this.repository().update({ name }, { where: { id } });
	}

	async findById(_id: PlayerId): Promise<Player | null> {
		await this.sequelize.sync();
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
		await this.sequelize.sync();
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

	protected entityInstance(): ModelAttributes {
		return PlayerInstance;
	}

	protected instanceName(): string {
		return "players";
	}
}
