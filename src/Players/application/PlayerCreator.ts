import { Player } from "../domain/Player";
import { PlayerId } from "../domain/PlayerId";
import { PlayerName } from "../domain/PlayerName";
import { PlayerRepository } from "../domain/PlayerRepository";
import { PlayerCreatorRequest } from "./requests/PlayerCreatorRequest";
import { PlayerResponse } from "./responses/PlayerResponse";

export class PlayerCreator {
	constructor(private readonly repository: PlayerRepository) {}

	async run(request: PlayerCreatorRequest): Promise<PlayerResponse> {
		const player = new Player(new PlayerId(), new PlayerName(request.name));

		await this.repository.create(player);

		return player.toPrimitives();
	}
}
