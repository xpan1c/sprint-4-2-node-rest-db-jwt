import { Request, Response, Router } from "express";
import { body, checkExact } from "express-validator";

import { PlayerCreator } from "../../../Players/application/PlayerCreator";
import { SequelizePlayerRepository } from "../../../Players/infrastructure/persistences/sequelize/SequelizePlayerRepositorty";
import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { PlayersPostController } from "../../controllers/players/PlayersPostController";
import { validateReqSchema } from "..";
/**
 * @openapi
 * /players:
 *   post:
 *     tags:
 *       - Players
 *     description: Create a new player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       '201':
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSuccess'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseBadRequest'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseServerError'
 */
export const register = (router: Router): void => {
	const reqSchema = [body("name").exists().isString()];

	const sequelizePlayerRepository = new SequelizePlayerRepository(sequelize);
	const playerCreator = new PlayerCreator(sequelizePlayerRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new PlayersPostController(playerCreator, httpResponse);
	router.post(
		"/players",
		checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await playersCtrl.run(req, res)
	);
};
