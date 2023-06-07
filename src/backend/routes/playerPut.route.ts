import { Request, Response, Router } from "express";

import { PlayerCreator } from "../../Players/application/PlayerCreator";
import { SequelizePlayerRepository } from "../../Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
import { UuidCreator } from "../../shared/application/UuidCreator";
import { sequelize } from "../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { PlayersPostController } from "../controllers/PlayersPostController";

export const register = (router: Router): void => {
	const uuidCreator = new UuidCreator();

	const sequelizePlayerRepository = new SequelizePlayerRepository(sequelize);
	const playerCreator = new PlayerCreator(sequelizePlayerRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new PlayersPostController(playerCreator, httpResponse);
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	router.put("/players", async (req: Request, res: Response) => await playersCtrl.run(req, res));
};
