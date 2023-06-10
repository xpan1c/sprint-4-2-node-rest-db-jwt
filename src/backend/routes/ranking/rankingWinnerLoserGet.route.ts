import { Request, Response, Router } from "express";

import { RankingWinnerLoserGetter } from "../../../Players/application/RankingWinnerLoserGetter";
//import { body, checkExact } from "express-validator";
import { SequelizePlayerRepository } from "../../../Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { RankingWinnerLoserGetController } from "../../controllers/ranking/RankingWinnerLoserGetController";
//import { validateReqSchema } from ".";
/**
 * @openapi
 * /ranking/{type}:
 *   get:
 *     tags:
 *       - Ranking
 *     description: Retrieves the ranking of players who have either won or lost the most
 *     parameters:
 *       - name: type
 *         in: path
 *         description: The type of ranking to retrieve, either 'winner' or 'loser'
 *         required: true
 *         schema:
 *           type: string
 *           enum: [winner, loser]
 *     responses:
 *       '200':
 *         description: Successfully retrieved player
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               properties:
 *                 player:
 *                   type: 'object'
 *                   properties:
 *                     id:
 *                       type: 'string'
 *                       description: 'The player ID'
 *                     name:
 *                       type: 'string'
 *                       description: 'The player name'
 *                     gamesPlayed:
 *                       type: 'number'
 *                       description: 'The number of games played by the player'
 *                 winRate:
 *                   type: 'number'
 *                   description: 'The win rate of the player'
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
	const winnerGetter = new RankingWinnerLoserGetter(sequelizePlayerRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new RankingWinnerLoserGetController(winnerGetter, httpResponse);
	router.get(
		"/ranking/:type(winner|loser)",
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await playersCtrl.run(req, res)
	);
};
