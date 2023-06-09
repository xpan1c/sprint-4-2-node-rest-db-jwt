import { PlayerId } from "../../Players/domain/PlayerId";
import { DiceResult } from "./DiceResult";
import { GameDice } from "./GameDice";
import { GameId } from "./GameId";
import { GameWin } from "./GameWin";

export class Game {
	readonly diceOne: GameDice;
	readonly diceTwo: GameDice;
	readonly win: GameWin;
	readonly result: DiceResult;
	constructor(
		readonly id: GameId,
		readonly playerId: PlayerId,
		diceOne?: GameDice,
		diceTwo?: GameDice
	) {
		diceOne ? (this.diceOne = diceOne) : (this.diceOne = new GameDice());
		diceTwo ? (this.diceTwo = diceTwo) : (this.diceTwo = new GameDice());
		this.result = new DiceResult(this.diceOne.value, this.diceTwo.value);
		this.win = new GameWin(this.result.value === 7);
	}

	static fromPrimitives(plainData: {
		id: string;
		playerId: string;
		diceOne?: number;
		diceTwo?: number;
	}): Game {
		return new Game(
			new GameId(plainData.id),
			new PlayerId(plainData.playerId),
			plainData.diceOne ? new GameDice(plainData.diceOne) : new GameDice(),
			plainData.diceTwo ? new GameDice(plainData.diceTwo) : new GameDice()
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			playerId: this.playerId.value,
			diceOne: this.diceOne.value,
			diceTwo: this.diceTwo.value,
			result: this.result.value,
			win: this.win.value,
		};
	}
}
