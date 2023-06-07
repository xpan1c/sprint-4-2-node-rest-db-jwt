import { Player } from "../../../../../src/Players/domain/Player";
import { PlayerName } from "../../../../../src/Players/domain/PlayerName";
import { SequelizePlayerRepository } from "../../../../../src/Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
import { Uuid } from "../../../../../src/shared/domain/value-object/Uuid";
import { sequelize } from "../../../../../src/shared/infrastructure/persistence/config/sequelize.config";

describe("SequelizePlayerRepository", () => {
	afterAll(async () => {
		await sequelize.drop();
		await sequelize.close();
	});
	it("should save a player", async () => {
		const expectedPlayer = new Player(new Uuid(), new PlayerName("name"));
		const repository = new SequelizePlayerRepository(sequelize);

		await repository.save(expectedPlayer);
		const player = await repository.search("id");
		expect(player).toEqual(expectedPlayer);
	});
});
