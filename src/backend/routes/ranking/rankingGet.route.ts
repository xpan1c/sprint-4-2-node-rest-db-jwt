import { Request, Response, Router } from "express";

import { RankingGetter } from "../../../Players/application/RankingGetter";
//import { body, checkExact } from "express-validator";
import { SequelizePlayerRepository } from "../../../Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { RankingGetController } from "../../controllers/ranking/RankingGetController";
//import { validateReqSchema } from ".";
/**
 * @openapi
 * /ranking:
 *   get:
 *     tags:
 *       - Ranking
 *     description: Retrieves the ranking of players
 *     responses:
 *       '200':
 *         description: Successfully retrieved ranking
 *         content:
 *           application/json:
 *             schema:
 *               type: 'array'
 *               items:
 *                 type: 'object'
 *                 properties:
 *                   player:
 *                     type: 'object'
 *                     properties:
 *                       id:
 *                         type: 'string'
 *                         description: 'The player ID'
 *                       name:
 *                         type: 'string'
 *                         description: 'The player name'
 *                   winRate:
 *                     type: 'number'
 *                     description: 'The win rate of the player'
 *                   averageWinRate:
 *                     type: 'number'
 *                     description: 'The average win rate of the player'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               properties:
 *                 status:
 *                   type: 'integer'
 *                   description: 'The status code'
 *                 statusMsg:
 *                   type: 'string'
 *                   description: 'The status message'
 *                 error:
 *                   type: 'string'
 *                   description: 'The error message'
 */
export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizePlayerRepository = new SequelizePlayerRepository(sequelize);
	const rankingGetter = new RankingGetter(sequelizePlayerRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new RankingGetController(rankingGetter, httpResponse);
	router.get(
		"/ranking",
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await playersCtrl.run(req, res)
	);
};
