import { NumberValueObject } from "../../shared/domain/value-object/NumberValueObject";

export class GameDice extends NumberValueObject {
	constructor(value?: number) {
		value ? super(value) : super(Math.floor(Math.random() * 6) + 1);
	}

	protected toString(): string {
		return `${this.value}`;
	}
}
