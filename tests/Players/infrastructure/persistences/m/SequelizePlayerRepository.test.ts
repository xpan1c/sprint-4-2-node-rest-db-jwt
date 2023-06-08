import { Player } from "../../../../../src/Players/domain/Player";
import { PlayerId } from "../../../../../src/Players/domain/PlayerId";
import { PlayerName } from "../../../../../src/Players/domain/PlayerName";
import { SequelizePlayerRepository } from "../../../../../src/Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
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
		const id = new PlayerId();
		const expectedPlayer = new Player(id, new PlayerName("name"));
		const repository = new SequelizePlayerRepository(sequelize);

		await repository.create(expectedPlayer);
		const player = await repository.findById(id);
		expect(player).toEqual(expectedPlayer);
	});
	it("should update a player", async () => {
		const repository = new SequelizePlayerRepository(sequelize);
		const playerId = new PlayerId();
		const id = playerId.value;
		let name = "Jose";
		const existingPlayer = Player.fromPrimitives({ id, name });
		await repository.create(existingPlayer);
		name = "Pepe";
		const updatedPlayer = Player.fromPrimitives({ id, name });

		await repository.update(updatedPlayer);
		const player = await repository.findById(playerId);
		expect(player).toEqual(updatedPlayer);
	});
});
