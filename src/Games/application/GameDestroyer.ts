import { PlayerId } from "../../Players/domain/PlayerId";
import { GameRepository } from "../domain/GameRepository";
import { GameDestroyerRequest } from "./GameDestroyerRequest";

export class GameDestroyer {
	constructor(private readonly repository: GameRepository) {}

	async run(request: GameDestroyerRequest): Promise<void> {
		await this.repository.delete(new PlayerId(request.id));
	}
}
