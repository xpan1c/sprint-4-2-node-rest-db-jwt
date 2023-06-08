import { Player } from "../domain/Player";
import { PlayerRepository } from "../domain/PlayerRepository";

export class PlayerGetter {
	constructor(private readonly repository: PlayerRepository) {}

	async run(): Promise<Player[]> {
		const players = await this.repository.findAll();
		if (!players) {
			throw new Error("There is no players");
		}

		return players;
	}
}
