import { GameWin } from "../../Games/domain/GameWin";
import { PlayerRepository } from "../domain/PlayerRepository";
import { PlayerGetterResponse } from "./responses/PlayerGetterResponse";

export class RankingWinnerLoserGetter {
	constructor(private readonly repository: PlayerRepository) {}

	async run(winner: boolean): Promise<PlayerGetterResponse> {
		const playerData = await this.repository.findWinnerOrLoser(new GameWin(winner));
		const player = playerData.player.toPrimitives();

		return { player, winRate: playerData.winRate };
	}
}
