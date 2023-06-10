import { Player } from "../domain/Player";
import { PlayerRepository } from "../domain/PlayerRepository";
import { PlayerUpdaterRequest } from "./requests/PlayerUpdaterRequest";

export class PlayerUpdater {
	constructor(private readonly repository: PlayerRepository) {}

	async run(request: PlayerUpdaterRequest): Promise<void> {
		const player = Player.fromPrimitives(request);
		if (!(await this.repository.findById(player.id))) {
			throw new Error(`Player id <${player.id.toString()}> does not exist`);
		}
		await this.repository.update(player);
	}
}
