import { Game } from "./Game";

export interface GameRepository {
	create(game: Game): Promise<Game | null>;
}
