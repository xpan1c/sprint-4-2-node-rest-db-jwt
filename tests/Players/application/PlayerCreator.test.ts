import { v4 as uuidv4 } from "uuid";

import { PlayerCreator } from "../../../src/Players/application/PlayerCreator";
import { Player } from "../../../src/Players/domain/Player";
import { PlayerName } from "../../../src/Players/domain/PlayerName";
import { PlayerNameLengthExceeded } from "../../../src/Players/domain/PlayerNameLengthExceeded";
import { PlayerRepository } from "../../../src/Players/domain/PlayerRepository";
import { Uuid } from "../../../src/shared/domain/value-object/Uuid";

jest.mock("uuid");

describe("PlayerCreator", () => {
	const repository: PlayerRepository = {
		create: jest.fn(),
		update: jest.fn(),
		findById: jest.fn(),
		findByName: jest.fn(),
		findAll: jest.fn(),
		findWithWinRate: jest.fn(),
	};
	afterEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});
	it("Should create a valid new player", async () => {
		const fixedUUID = "123e4567-e89b-12d3-a456-426655440000";
		(uuidv4 as jest.Mock).mockReturnValue(fixedUUID);
		const id = new Uuid();
		const creator = new PlayerCreator(repository);

		const name = "John";
		const expectedPlayer = new Player(id, new PlayerName(name));
		await creator.run({ name });
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(repository.create).toHaveBeenCalledWith(expectedPlayer);
	});
	it("Should create a valid new player with anonymized name when name is empty", async () => {
		const fixedUUID = "123e4567-e89b-12d3-a456-426655440000";
		(uuidv4 as jest.Mock).mockReturnValue(fixedUUID);
		const id = new Uuid();
		jest.spyOn(Math, "random").mockReturnValue(0.1234);
		const creator = new PlayerCreator(repository);

		const name = "";
		const expectedPlayer = new Player(id, new PlayerName(name));
		await creator.run({ name });
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(repository.create).toHaveBeenCalledWith(expectedPlayer);
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(repository.create).toHaveBeenCalledTimes(1);
	});
	it("should throw error if player name length is exceeded", async () => {
		const name = "some-name".repeat(10);
		const creator = new PlayerCreator(repository);
		// eslint-disable-next-line @typescript-eslint/unbound-method
		try {
			await creator.run({ name });
		} catch (error) {
			expect(error).toBeInstanceOf(PlayerNameLengthExceeded);
		}
	});
});
