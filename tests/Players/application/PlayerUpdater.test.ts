import { PlayerUpdater } from "../../../src/Players/application/PlayerUpdater";
import { Player } from "../../../src/Players/domain/Player";
import { PlayerId } from "../../../src/Players/domain/PlayerId";
import { PlayerRepository } from "../../../src/Players/domain/PlayerRepository";

describe("PlayerUpdater", () => {
	const repository: jest.Mocked<PlayerRepository> = {
		create: jest.fn(),
		update: jest.fn(),
		findById: jest.fn(),
		findByName: jest.fn(),
		findAll: jest.fn(),
		findWithWinRate: jest.fn(),
		findRanking: jest.fn(),
		findWinnerOrLoser: jest.fn(),
	};
	const updater = new PlayerUpdater(repository);
	afterEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});
	it("Should update an existing player", async () => {
		const id = new PlayerId().value;
		let name = "Jose";
		const existingPlayer = Player.fromPrimitives({ id, name });
		name = "Pepe";
		const updatedPlayer = Player.fromPrimitives({ id, name });
		repository.findById.mockResolvedValue(existingPlayer);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await updater.run(updatedPlayer.toPrimitives());
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(repository.update).toHaveBeenCalledWith(updatedPlayer);
	});
	it("Should throw an error when player does not exist", async () => {
		const id = new PlayerId().value;
		let name = "Jose";
		const existingPlayer = Player.fromPrimitives({ id, name });
		name = "Pepe";
		const updatedPlayer = Player.fromPrimitives({ id, name });

		repository.findById.mockResolvedValue(null);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await expect(updater.run(updatedPlayer.toPrimitives())).rejects.toThrow();
	});
	it("Should throw an error when database update fails", async () => {
		const id = new PlayerId().value;
		let name = "Jose";
		const existingPlayer = Player.fromPrimitives({ id, name });
		name = "Pepe";
		const updatedPlayer = Player.fromPrimitives({ id, name });

		repository.findById.mockResolvedValue(existingPlayer);
		repository.update.mockRejectedValue(new Error("DB Update Failed"));

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await expect(updater.run(updatedPlayer.toPrimitives())).rejects.toThrow();
	});
});
