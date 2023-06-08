import { Player } from "./Player";
import { PlayerId } from "./PlayerId";
import { PlayerName } from "./PlayerName";

export interface PlayerRepository {
	create(player: Player): Promise<void>;
	update(player: Player): Promise<void>;
	findById(id: PlayerId): Promise<Player | null>;
	findByName(name: PlayerName): Promise<Player | null>;
}
