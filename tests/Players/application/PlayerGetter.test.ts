/* eslint-disable @typescript-eslint/unbound-method */
import { PlayerGetter } from "../../../src/Players/application/PlayerGetter";
import { PlayerGetterResponse } from "../../../src/Players/application/responses/PlayerGetterResponse";
import { PlayerResponse } from "../../../src/Players/application/responses/PlayerResponse";
import { Player } from "../../../src/Players/domain/Player";
import { PlayerId } from "../../../src/Players/domain/PlayerId";
import { PlayerName } from "../../../src/Players/domain/PlayerName";
import { PlayerRepository } from "../../../src/Players/domain/PlayerRepository";

jest.mock("../../../src/Players/domain/PlayerRepository");

describe("PlayerGetter", () => {
	const repository: PlayerRepository = {
		create: jest.fn(),
		update: jest.fn(),
		findById: jest.fn(),
		findByName: jest.fn(),
		findAll: jest.fn(),
		findWithWinRate: jest.fn(),
		findRanking: jest.fn(),
		findWinnerOrLoser: jest.fn(),
	};

	const getter = new PlayerGetter(repository);

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return all players", async () => {
		const player1 = new Player(new PlayerId(), new PlayerName("John"));
		const player1Response: PlayerResponse = { id: player1.id.value, name: player1.name.value };
		const player1Get = { player: player1, winRate: 0 };
		const player2 = new Player(new PlayerId(), new PlayerName("Jane"));
		const player2Response: PlayerResponse = { id: player2.id.value, name: player2.name.value };
		const player2Get = { player: player2, winRate: 0 };
		const expectedPlayers = [player1Get, player2Get];
		const playersExpected: PlayerGetterResponse[] = [
			{ player: player1Response, winRate: 0 },
			{ player: player2Response, winRate: 0 },
		];
		repository.findWithWinRate = jest.fn().mockResolvedValue(expectedPlayers);

		const players = await getter.run();

		expect(players).toEqual(playersExpected);
		expect(repository.findWithWinRate).toHaveBeenCalledTimes(1);
	});

	it("should throw an error when no players are found", async () => {
		repository.findWithWinRate = jest.fn().mockResolvedValue([]);

		await expect(getter.run()).rejects.toThrow("There are no players");
		expect(repository.findWithWinRate).toHaveBeenCalledTimes(1);
	});
});
