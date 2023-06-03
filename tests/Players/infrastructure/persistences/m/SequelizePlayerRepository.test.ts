import { Player } from "../../../../../src/Players/domain/Player";
import { SequelizePlayerRepository } from "../../../../../src/Players/infrastructure/persistences/mysql/SequelizePlayerRepositorty";

describe("SequelizePlayerRepository", () => {
	it("should save a player", async () => {
		const expectedPlayer = new Player("id", "name");
		const repository = new SequelizePlayerRepository();

		await repository.save(expectedPlayer);
		const player = repository.search("id");
		expect(player).toEqual(expectedPlayer);
	});
});
