export interface GameCreatorResponse {
	id: string;
	playerId: string;
	diceOne: number;
	diceTwo: number;
	result: number;
	win: boolean;
}
