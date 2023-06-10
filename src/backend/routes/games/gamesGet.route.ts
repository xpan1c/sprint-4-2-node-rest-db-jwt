import { Request, Response, Router } from "express";

import { GameGetter } from "../../../Games/application/GameGetter";
import { SequelizeGameRepository } from "../../../Games/infrastructure/persistences/sequelize/SequelizeGameRepository";
import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { GamesGetController } from "../../controllers/games/GamesGetController";
/**
 * @openapi
 * /games/{id}:
 *   get:
 *     tags:
 *       - Games
 *     description: Retrieves games for a specific player
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the player whose games are to be retrieved
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved games
 *         content:
 *           application/json:
 *             schema:
 *               type: 'array'
 *               items:
 *                 type: 'object'
 *                 properties:
 *                   id:
 *                     type: 'string'
 *                     description: 'The game ID'
 *                   playerId:
 *                     type: 'string'
 *                     description: 'The player ID'
 *                   diceOne:
 *                     type: 'number'
 *                     description: 'The first dice value'
 *                   diceTwo:
 *                     type: 'number'
 *                     description: 'The second dice value'
 *                   result:
 *                     type: 'number'
 *                     description: 'The result of the dice roll'
 *                   win:
 *                     type: 'boolean'
 *                     description: 'Indicates if the player won the game'
 *       '400':
 *         description: Bad Request
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

	const sequelizeGameRepository = new SequelizeGameRepository(sequelize);
	const gameGetter = new GameGetter(sequelizeGameRepository);
	const httpResponse = new HttpResponse();
	const gamesCtrl = new GamesGetController(gameGetter, httpResponse);
	router.get(
		"/games/:id",
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await gamesCtrl.run(req, res)
	);
};
