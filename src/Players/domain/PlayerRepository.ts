import { Player } from "./Player";

export interface PlayerRepository {
	save(player: Player): Promise<void>;
	search(id: string): Promise<Player>;
}
