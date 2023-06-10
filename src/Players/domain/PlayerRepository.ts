import { GameWin } from "../../Games/domain/GameWin";
import { Player } from "./Player";
import { PlayerId } from "./PlayerId";
import { PlayerName } from "./PlayerName";

export interface PlayerRepository {
	create(player: Player): Promise<void>;
	update(player: Player): Promise<void>;
	findById(id: PlayerId): Promise<Player | null>;
	findByName(name: PlayerName): Promise<Player | null>;
	findAll(): Promise<Player[] | null>;
	findWithWinRate(): Promise<Array<{ player: Player; winRate: number }>>;
	findRanking(): Promise<Array<{ player: Player; winRate: number; averageWinRate: number }>>;
	findWinnerOrLoser(winner: GameWin): Promise<{ player: Player; winRate: number }>;
}
