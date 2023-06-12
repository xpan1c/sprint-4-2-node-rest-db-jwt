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

afterEach(async () => {
	await sequelize.drop();
});

afterAll(async () => {
	await sequelize.close();
});

describe("SequelizePlayerRepository", () => {
	//let repository: SequelizePlayerRepository;
	const id = new PlayerId();
	const expectedPlayer = new Player(id, new PlayerName("name"));
	let repository: SequelizePlayerRepository;
	it("should save a player", async () => {
		repository = new SequelizePlayerRepository(sequelize);
		await repository.create(expectedPlayer);
		const player = await repository.findById(id);
		expect(player).toEqual(expectedPlayer);
	});

	it("should update a player", async () => {
		await repository.create(expectedPlayer);

		const updatedPlayer = Player.fromPrimitives({ id: id.value, name: "Pepe" });
		await repository.update(updatedPlayer);

		const player = await repository.findById(id);
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
