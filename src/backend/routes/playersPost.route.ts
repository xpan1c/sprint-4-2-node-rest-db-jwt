import { Request, Response, Router } from "express";
import { body } from "express-validator";

import { PlayerCreator } from "../../Players/application/PlayerCreator";
import { SequelizePlayerRepository } from "../../Players/infrastructure/persistences/mysql/SequelizePlayerRepositorty";
import { UuidCreator } from "../../shared/application/UuidCreator";
import { sequelize } from "../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { PlayersPostController } from "../controllers/PlayersPostController";
import { validateReqSchema } from ".";

export const register = (router: Router): void => {
	const reqSchema = [body("name").exists().isString()];
	const uuidCreator = new UuidCreator();

	const sequelizePlayerRepository = new SequelizePlayerRepository(sequelize);
	const playerCreator = new PlayerCreator(sequelizePlayerRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new PlayersPostController(playerCreator, httpResponse);
	router.post(
		"/players",
		reqSchema,
		validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await playersCtrl.run(req, res)
	);
};
