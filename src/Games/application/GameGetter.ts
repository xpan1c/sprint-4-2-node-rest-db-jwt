import { PlayerId } from "../../Players/domain/PlayerId";
import { GameRepository } from "../domain/GameRepository";
import { GameGetterRequest } from "./GameGetterRequest";
import { GameGetterResponse } from "./GamesGetterResponse";

export class GameGetter {
	constructor(private readonly repository: GameRepository) {}

	async run(request: GameGetterRequest): Promise<GameGetterResponse[]> {
		const games = await this.repository.findByPlayerId(new PlayerId(request.id));

		return games.map((game) => game.toPrimitives());
	}
}
