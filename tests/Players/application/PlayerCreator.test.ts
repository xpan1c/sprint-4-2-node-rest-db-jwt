import { PlayerCreator } from "../../../src/Players/application/PlayerCreator";
import { Player } from "../../../src/Players/domain/Player";
import { PlayerRepository } from "../../../src/Players/domain/PlayerRepository";
import { UuidCreator } from "../../../src/shared/application/UuidCreator";

describe("PlayerCreator", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});
	it("Should create a valid new player", async () => {
		const repository: PlayerRepository = {
			save: jest.fn(),
			search: jest.fn(),
		};
		const uuidCreator: UuidCreator = {
			UUIDgenerator: jest.fn(),
		};
		const id = "abc";
		jest.spyOn(uuidCreator, "UUIDgenerator").mockReturnValue(id);
		const creator = new PlayerCreator(repository, uuidCreator);

		const playerName = "John";
		const expectedPlayer = new Player(id, playerName);
		await creator.run(playerName);
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(repository.save).toHaveBeenCalledWith(expectedPlayer);
	});
	it("Should create a valid new player with anonymized name when name is empty", async () => {
		const repository: PlayerRepository = {
			save: jest.fn(),
			search: jest.fn(),
		};
		const uuidCreator: UuidCreator = {
			UUIDgenerator: jest.fn(),
		};
		const id = "abc";
		jest.spyOn(uuidCreator, "UUIDgenerator").mockReturnValue(id);
		jest.spyOn(Math, "random").mockReturnValue(0.1234);
		const creator = new PlayerCreator(repository, uuidCreator);

		const playerName = "";
		const expectedPlayer = new Player(id, `anonym-0123`);
		await creator.run(playerName);
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(repository.save).toHaveBeenCalledWith(expectedPlayer);
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(repository.save).toHaveBeenCalledTimes(1);
	});
});
