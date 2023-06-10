import { Request, Response, Router } from "express";

import { GameDestroyer } from "../../../Games/application/GameDestroyer";
import { SequelizeGameRepository } from "../../../Games/infrastructure/persistences/sequelize/SequelizeGameRepository";
import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { GamesDeleteController } from "../../controllers/games/GamesDeleteController";
/**
 * @openapi
 * /games/{id}:
 *   delete:
 *     tags:
 *       - Games
 *     description: Deletes games for a specific player
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the player whose games are to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Games deleted successfully
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
 *                   type: 'string'
 *                   description: 'Success message'
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
	const gameDestroyer = new GameDestroyer(sequelizeGameRepository);
	const httpResponse = new HttpResponse();
	const gamesCtrl = new GamesDeleteController(gameDestroyer, httpResponse);
	router.delete(
		"/games/:id",
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await gamesCtrl.run(req, res)
	);
};
