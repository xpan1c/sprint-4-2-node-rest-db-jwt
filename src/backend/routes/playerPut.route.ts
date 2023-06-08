import { Request, Response, Router } from "express";

import { PlayerUpdater } from "../../Players/application/PlayerUpdater";
import { SequelizePlayerRepository } from "../../Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
import { sequelize } from "../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { PlayerPutController } from "../controllers/PlayersPutController";

export const register = (router: Router): void => {
	const sequelizePlayerRepository = new SequelizePlayerRepository(sequelize);
	const playerUpdater = new PlayerUpdater(sequelizePlayerRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new PlayerPutController(playerUpdater, httpResponse);
	router.put(
		"/players/:id",
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await playersCtrl.run(req, res)
	);
};
