import { Uuid } from "../../shared/domain/value-object/Uuid";
import { PlayerName } from "./PlayerName";

export class Player {
	constructor(readonly id: Uuid, readonly name: PlayerName) {}
}
