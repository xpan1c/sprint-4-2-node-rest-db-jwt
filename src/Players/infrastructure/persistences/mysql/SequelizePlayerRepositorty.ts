import { Sequelize } from "sequelize";

import { InvalidArgumentError } from "../../../../shared/domain/value-object/InvalidArgumentError";
import { SequelizeRepository } from "../../../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { Player } from "../../../domain/Player";
import { PlayerRepository } from "../../../domain/PlayerRepository";
import { Players } from "./PlayerModel";

export class SequelizePlayerRepository
	extends SequelizeRepository<Players>
	implements PlayerRepository
{
	constructor(sequelize: Sequelize) {
		super(sequelize);
		sequelize.authenticate();
	}

	async save(player: Player): Promise<void> {
		await this.sequelize.sync();
		if (await this.findByName(player.name)) {
			throw new InvalidArgumentError("Player's name already exist");
		}
		await Players.create(player);
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
}
