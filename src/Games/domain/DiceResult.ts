import { NumberValueObject } from "../../shared/domain/value-object/NumberValueObject";

export class DiceResult extends NumberValueObject {
	constructor(...value: number[]) {
		super(value.reduce((accumulate, value) => accumulate + value, 0));
	}

	protected toString(): string {
		throw new Error("Method not implemented.");
	}
}
