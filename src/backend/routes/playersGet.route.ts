import { Request, Response, Router } from "express";

import { PlayerGetter } from "../../Players/application/PlayerGetter";
//import { body, checkExact } from "express-validator";
import { SequelizePlayerRepository } from "../../Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
import { sequelize } from "../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { PlayersGetController } from "../controllers/PlayersGetController";
//import { validateReqSchema } from ".";

export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizePlayerRepository = new SequelizePlayerRepository(sequelize);
	const playerGetter = new PlayerGetter(sequelizePlayerRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new PlayersGetController(playerGetter, httpResponse);
	router.get(
		"/players",
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await playersCtrl.run(req, res)
	);
};
