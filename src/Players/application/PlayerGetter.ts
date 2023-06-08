import { Player } from "../domain/Player";
import { PlayerRepository } from "../domain/PlayerRepository";
import { PlayerGetterResponse } from "./PlayerGetterResponse";

export class PlayerGetter {
	constructor(private readonly repository: PlayerRepository) {}

	async run(): Promise<PlayerGetterResponse[]> {
		const playersPersistence = await this.repository.findAll();
		if (playersPersistence === null) {
			throw new Error("There is no players");
		}
		const mp = (player: Player): PlayerGetterResponse => {
			return player.toPrimitives();
		};
		const players = playersPersistence.map(mp);

		return players;
	}
}
