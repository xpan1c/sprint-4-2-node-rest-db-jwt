import { PlayerId } from "../../Players/domain/PlayerId";
import { Game } from "../domain/Game";
import { GameId } from "../domain/GameId";
import { GameRepository } from "../domain/GameRepository";
import { GameCreatorRequest } from "./GameCreatorRequest";
import { GameCreatorResponse } from "./GameCreatorResponse";

export class GameCreator {
	constructor(private readonly repository: GameRepository) {}

	async run(request: GameCreatorRequest): Promise<GameCreatorResponse> {
		const game = new Game(new GameId(), new PlayerId(request.id));

		await this.repository.create(game);

		return game.toPrimitives();
	}
}
