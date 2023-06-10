import { Player } from "../domain/Player";
import { PlayerRepository } from "../domain/PlayerRepository";
import { PlayerGetterResponse } from "./responses/PlayerGetterResponse";

export class RankingGetter {
	constructor(private readonly repository: PlayerRepository) {}

	async run(): Promise<
		Array<{ player: PlayerGetterResponse; winRate: number; averageWinRate: number }>
	> {
		const playersPersistence = await this.repository.findRanking();

		const mp = (response: {
			player: Player;
			winRate: number;
			averageWinRate: number;
		}): { player: PlayerGetterResponse; winRate: number; averageWinRate: number } => {
			const player = response.player.toPrimitives();
			const winRate = response.winRate;
			const averageWinRate = response.averageWinRate;

			return { player, winRate, averageWinRate };
		};
		const players = playersPersistence.map(mp);

		return players;
	}
}
