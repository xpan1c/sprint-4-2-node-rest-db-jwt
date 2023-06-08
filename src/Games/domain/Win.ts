import { BooleanValueObject } from "../../shared/domain/value-object/BooleanValueObject";

export class Win extends BooleanValueObject {
	protected toString(): string {
		return this.value ? "Winner" : "Loser";
	}
}
