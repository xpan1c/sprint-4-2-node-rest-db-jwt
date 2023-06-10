import { PlayerId } from "../../Players/domain/PlayerId";
import { Game } from "./Game";

export interface GameRepository {
	create(game: Game): Promise<Game | null>;
	delete(playerId: PlayerId): Promise<void>;
	findByPlayerId(playerId: PlayerId): Promise<Game[]>;
}
