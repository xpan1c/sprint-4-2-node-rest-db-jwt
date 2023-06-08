import { NumberValueObject } from "../../shared/domain/value-object/NumberValueObject";

export class DiceResult extends NumberValueObject {
	constructor(value?: number) {
		value ? super(value) : super(DiceResult.throwTheDices(2, 6));
	}

	private static throwTheDice(faces: number): number {
		return Math.floor(Math.random() * faces) + 1;
	}

	private static throwTheDices(dices: number, faces: number): number {
		const dicesThrower = Array.from({ length: dices }, () => DiceResult.throwTheDice(faces));
		const total = dicesThrower.reduce((accumulate, value) => accumulate + value, 0);

		return total;
	}

	protected toString(): string {
		throw new Error("Method not implemented.");
	}
}
