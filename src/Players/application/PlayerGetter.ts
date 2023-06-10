import { Player } from "../domain/Player";
import { PlayerRepository } from "../domain/PlayerRepository";
import { PlayerGetterResponse } from "./responses/PlayerGetterResponse";
import { PlayerResponse } from "./responses/PlayerResponse";

export class PlayerGetter {
	constructor(private readonly repository: PlayerRepository) {}

	async run(): Promise<PlayerGetterResponse[]> {
		const playersPersistence = await this.repository.findWithWinRate();

		const cb = (response: { player: Player; winRate: number }): PlayerGetterResponse => {
			const player: PlayerResponse = response.player.toPrimitives();
			const winRate = response.winRate;

			return { player, winRate };
		};
		const players = playersPersistence.map(cb);

		return players;
	}
}
