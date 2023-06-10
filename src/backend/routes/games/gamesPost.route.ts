import { Request, Response, Router } from "express";

import { GameCreator } from "../../../Games/application/GameCreator";
import { SequelizeGameRepository } from "../../../Games/infrastructure/persistences/sequelize/SequelizeGameRepository";
import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { GamesPostController } from "../../controllers/games/GamesPostController";
/**
 * @openapi
 * /games/{id}:
 *   post:
 *     tags:
 *       - Games
 *     description: Creates a new game for a specific player
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the player to create a game for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Game created successfully
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
 *                 data:
 *                   type: 'object'
 *                   properties:
 *                     id:
 *                       type: 'string'
 *                       description: 'The game id'
 *                     playerId:
 *                       type: 'string'
 *                       description: 'The id of the player'
 *                     diceOne:
 *                       type: 'integer'
 *                       description: 'The result of the first dice'
 *                     diceTwo:
 *                       type: 'integer'
 *                       description: 'The result of the second dice'
 *                     result:
 *                       type: 'integer'
 *                       description: 'The sum of the two dices'
 *                     win:
 *                       type: 'boolean'
 *                       description: 'Whether the player won the game'
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
