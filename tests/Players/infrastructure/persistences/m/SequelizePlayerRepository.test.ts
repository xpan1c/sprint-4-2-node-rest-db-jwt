import { Player } from "../../../../../src/Players/domain/Player";
import { PlayerName } from "../../../../../src/Players/domain/PlayerName";
import { SequelizePlayerRepository } from "../../../../../src/Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
import { Uuid } from "../../../../../src/shared/domain/value-object/Uuid";
import {
	initializeDatabase,
	sequelize,
} from "../../../../../src/shared/infrastructure/persistence/config/sequelize.config";

beforeAll(async () => {
	await initializeDatabase();
});
afterAll(async () => {
	await sequelize.close();
});
describe("SequelizePlayerRepository", () => {
	beforeEach(async () => {
		await sequelize.drop();
		await sequelize.sync();
	});
	afterAll(async () => {
		await sequelize.drop();
		await sequelize.close();
	});
	it("should save a player", async () => {
		const id = new Uuid();
		const expectedPlayer = new Player(id, new PlayerName("name"));
		const repository = new SequelizePlayerRepository(sequelize);

		await repository.save(expectedPlayer);
		const player = await repository.search(id.value);
		expect(player).toEqual(expectedPlayer);
	});
});
