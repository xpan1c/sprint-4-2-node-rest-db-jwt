import { ModelAttributes } from "sequelize";

import { PlayerId } from "../../../../Players/domain/PlayerId";
import { SequelizeRepository } from "../../../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { Game } from "../../../domain/Game";
import { GameRepository } from "../../../domain/GameRepository";
import { GameInstance } from "./GameInstance";

export class SequelizeGameRepository extends SequelizeRepository implements GameRepository {
	async create(game: Game): Promise<Game> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await this.repository().create(game.toPrimitives());

		return game;
	}

	async delete(playerId: PlayerId): Promise<void> {
		await this.repository().destroy({ where: { playerId: playerId.value } });
	}

	async findByPlayerId(playerId: PlayerId): Promise<Game[]> {
		const gamesRepository = await this.repository().findAll({
			where: { playerId: playerId.value },
		});
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const games = gamesRepository.map((game) => Game.fromPrimitives(game.get({ plain: true })));

		return games;
	}

	protected entityInstance(): ModelAttributes {
		return GameInstance;
	}

	protected instanceName(): string {
		return "games";
	}
}
