import { Request, Response, Router } from "express";

import { PlayerGetter } from "../../../Players/application/PlayerGetter";
//import { body, checkExact } from "express-validator";
import { SequelizePlayerRepository } from "../../../Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { PlayersGetController } from "../../controllers/players/PlayersGetController";
//import { validateReqSchema } from ".";
/**
 * @openapi
 * /players:
 *   get:
 *     tags:
 *       - Players
 *     description: Retrieves all players
 *     responses:
 *       '200':
 *         description: Players retrieved successfully
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
 *                         description: 'The ID of the player'
 *                       name:
 *                         type: 'string'
 *                         description: 'The name of the player'
 *                   winRate:
 *                     type: 'number'
 *                     format: 'float'
 *                     description: 'The win rate of the player'
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
