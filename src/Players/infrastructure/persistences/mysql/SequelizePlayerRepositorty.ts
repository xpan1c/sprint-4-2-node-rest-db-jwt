import { Player } from "../../../domain/Player";
import { PlayerRepository } from "../../../domain/PlayerRepository";
import { Players } from "./PlayerModel";

export class SequelizePlayerRepository implements PlayerRepository {
	async save(player: Player): Promise<void> {
		await Players.create(player);
	}

	async search(id: string): Promise<Player> {
		throw new Error("Method not implemented.");
	}
}
