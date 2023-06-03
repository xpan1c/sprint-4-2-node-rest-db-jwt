import { UuidCreator } from "../../shared/application/UuidCreator";
import { Player } from "../domain/Player";
import { PlayerRepository } from "../domain/PlayerRepository";

export class PlayerCreator {
	constructor(
		private readonly repository: PlayerRepository,
		private readonly uuidCreator: UuidCreator
	) {}

	async run(name: string): Promise<void> {
		const player = new Player(this.uuidCreator.UUIDgenerator(), name);

		await this.repository.save(player);
	}
}
