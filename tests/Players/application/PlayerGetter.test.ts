/* eslint-disable @typescript-eslint/unbound-method */
import { PlayerGetter } from "../../../src/Players/application/PlayerGetter";
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
	};
	let getter: PlayerGetter;

	beforeEach(() => {
		getter = new PlayerGetter(repository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return all players", async () => {
		const player1 = new Player(new PlayerId(), new PlayerName("John"));
		const player2 = new Player(new PlayerId(), new PlayerName("Jane"));
		const expectedPlayers = [player1, player2];

		repository.findAll = jest.fn().mockResolvedValue(expectedPlayers);

		const players = await getter.run();

		expect(players).toEqual(expectedPlayers);
		expect(repository.findAll).toHaveBeenCalledTimes(1);
	});

	it("should throw an error when no players are found", async () => {
		repository.findAll = jest.fn().mockResolvedValue(null);

		await expect(getter.run()).rejects.toThrow("There is no players");
		expect(repository.findAll).toHaveBeenCalledTimes(1);
	});
});
