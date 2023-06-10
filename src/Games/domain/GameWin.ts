import { BooleanValueObject } from "../../shared/domain/value-object/BooleanValueObject";

export class GameWin extends BooleanValueObject {
	protected toString(): string {
		return this.value ? "Winner" : "Loser";
	}
}
