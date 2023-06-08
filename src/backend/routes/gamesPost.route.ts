import { Request, Response, Router } from "express";

import { GameCreator } from "../../Games/application/GameCreator";
import { SequelizeGameRepository } from "../../Games/infrastructure/persistences/sequelize/SequelizeGameRepository";
import { sequelize } from "../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { GamesPostController } from "../controllers/GamesPostController";

export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizeGameRepository = new SequelizeGameRepository(sequelize);
	const gameCreator = new GameCreator(sequelizeGameRepository);
	const httpResponse = new HttpResponse();
	const gamesCtrl = new GamesPostController(gameCreator, httpResponse);
	router.post(
		"/games/:id",
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await gamesCtrl.run(req, res)
	);
};
