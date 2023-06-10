import { Request, Response, Router } from "express";

import { PlayerUpdater } from "../../../Players/application/PlayerUpdater";
import { SequelizePlayerRepository } from "../../../Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { PlayerPutController } from "../../controllers/players/PlayersPutController";
/**
 * @openapi
 * /players/{id}:
 *   put:
 *     tags:
 *       - Players
 *     description: Updates a specific player
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the player to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Name of the player to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Player updated successfully
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
