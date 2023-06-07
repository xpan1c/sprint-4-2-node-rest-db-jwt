import { ModelAttributes } from "sequelize";

import { InvalidArgumentError } from "../../../../shared/domain/value-object/InvalidArgumentError";
import { SequelizeRepository } from "../../../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { Player } from "../../../domain/Player";
import { PlayerRepository } from "../../../domain/PlayerRepository";
import { PlayerInstance, Players } from "./PlayerModel";

export class SequelizePlayerRepository extends SequelizeRepository implements PlayerRepository {
	async save(player: Player): Promise<void> {
		/* if (await this.findByName(player.name)) {
			throw new InvalidArgumentError("Player's name already exist");
		} */
		//const players = this.sequelize.models.players;
		const id = player.id.toString();
		const name = player.id.toString();
		await this.repository().create({ id, name });
	}

	async search(id: string): Promise<Player | null> {
		const player = await Players.findByPk(id);

		if (player === null) {
			throw new InvalidArgumentError("Player id does not exist");
		}

		return new Player(player.id, player.name);
	}

	async findByName(name: string): Promise<Player | null> {
		const player = await Players.findOne({ where: { name } });

		return player;
	}

	protected entityInstance(): ModelAttributes {
		return PlayerInstance;
	}

	protected instanceName(): string {
		return "players";
	}
}
