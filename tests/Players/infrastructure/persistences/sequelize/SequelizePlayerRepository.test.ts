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
	let repository: SequelizePlayerRepository;

	beforeEach(async () => {
		await sequelize.drop();
		await sequelize.sync();
		repository = new SequelizePlayerRepository(sequelize);
	});

	afterAll(async () => {
		await sequelize.drop();
		await sequelize.close();
	});

	it("should save a player", async () => {
		const id = new PlayerId();
		const expectedPlayer = new Player(id, new PlayerName("name"));
		await repository.create(expectedPlayer);
		const player = await repository.findById(id);
		expect(player).toEqual(expectedPlayer);
	});

	it("should update a player", async () => {
		const playerId = new PlayerId();
		const id = playerId.value;
		const existingPlayer = Player.fromPrimitives({ id, name: "Jose" });
		await repository.create(existingPlayer);

		const updatedPlayer = Player.fromPrimitives({ id, name: "Pepe" });
		await repository.update(updatedPlayer);

		const player = await repository.findById(playerId);
		expect(player).toEqual(updatedPlayer);
	});

	it("should find all players", async () => {
		const player1 = new Player(new PlayerId(), new PlayerName("John"));
		const player2 = new Player(new PlayerId(), new PlayerName("Jane"));

		await repository.create(player1);
		await repository.create(player2);

		const players = await repository.findAll();
		expect(players).toContainEqual(player1);
		expect(players).toContainEqual(player2);
	});
});
