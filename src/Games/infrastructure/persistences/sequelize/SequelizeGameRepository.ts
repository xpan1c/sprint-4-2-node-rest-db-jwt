import { ModelAttributes } from "sequelize";

import { SequelizeRepository } from "../../../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { Game } from "../../../domain/Game";
import { GameRepository } from "../../../domain/GameRepository";
import { GameInstance } from "./GameInstance";

export class SequelizeGameRepository extends SequelizeRepository implements GameRepository {
	async create(game: Game): Promise<Game> {
		await this.sequelize.sync();

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await this.repository().create(game.toPrimitives());

		return game;
	}

	protected entityInstance(): ModelAttributes {
		return GameInstance;
	}

	protected instanceName(): string {
		return "games";
	}
}
