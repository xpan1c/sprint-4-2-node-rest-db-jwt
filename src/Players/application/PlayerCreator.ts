import { Uuid } from "../../shared/domain/value-object/Uuid";
import { Player } from "../domain/Player";
import { PlayerName } from "../domain/PlayerName";
import { PlayerRepository } from "../domain/PlayerRepository";
import { PlayerCreatorRequest } from "./PlayerCreatorRequest";
import { PlayerCreatorResponse } from "./PlayerCreatorResponse";

export class PlayerCreator {
	constructor(private readonly repository: PlayerRepository) {}

	async run(request: PlayerCreatorRequest): Promise<PlayerCreatorResponse> {
		const player = new Player(new Uuid(), new PlayerName(request.name));

		await this.repository.create(player);

		return player.toPrimitives();
	}
}
