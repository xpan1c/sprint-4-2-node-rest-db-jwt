import { Player } from "../../../../../src/Players/domain/Player";
import { SequelizePlayerRepository } from "../../../../../src/Players/infrastructure/persistences/mysql/SequelizePlayerRepositorty";
import { sequelize } from "../../../../../src/shared/infrastructure/persistence/config/sequelize.config";

describe("SequelizePlayerRepository", () => {
	afterAll(async () => {
		await sequelize.drop();
		await sequelize.close();
	});
	it("should save a player", async () => {
		const expectedPlayer = new Player("id", "name");
		const repository = new SequelizePlayerRepository(sequelize);

		await repository.save(expectedPlayer);
		const player = await repository.search("id");
		expect(player).toEqual(expectedPlayer);
	});
});
