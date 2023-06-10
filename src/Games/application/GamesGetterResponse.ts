export interface GameGetterResponse {
	id: string;
	playerId: string;
	diceOne: number;
	diceTwo: number;
	result: number;
	win: boolean;
}
