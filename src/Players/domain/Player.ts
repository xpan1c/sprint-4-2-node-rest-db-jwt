import { Uuid } from "../../shared/domain/value-object/Uuid";
import { PlayerId } from "./PlayerId";
import { PlayerName } from "./PlayerName";

export class Player {
	constructor(readonly id: Uuid, readonly name: PlayerName) {}
	static fromPrimitives(plainData: { id: string; name: string }): Player {
		return new Player(new PlayerId(plainData.id), new PlayerName(plainData.name));
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
		};
	}
}
