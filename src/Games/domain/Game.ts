import { PlayerId } from "../../Players/domain/PlayerId";
import { DiceResult } from "./DiceResult";
import { GameId } from "./GameId";
import { Win } from "./Win";

export class Game {
	readonly win: Win;
	readonly result: DiceResult;
	constructor(readonly id: GameId, readonly playerId: PlayerId, result?: DiceResult) {
		result ? (this.result = result) : (this.result = new DiceResult());
		this.win = new Win(this.result.value > 7);
	}

	static fromPrimitives(plainData: { id: string; playerId: string; result?: number }): Game {
		return new Game(
			new GameId(plainData.id),
			new PlayerId(plainData.playerId),
			new DiceResult(plainData.result)
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			playerId: this.playerId.value,
			result: this.result.value,
			win: this.win.value,
		};
	}
}
