import { Request, Response } from "express";

import { PlayerCreator } from "../../Players/application/PlayerCreator";
import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { Controller } from "./Controller";

export class PlayersPostController implements Controller {
	constructor(
		private readonly playerCreator: PlayerCreator,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: Request, res: Response): Promise<void> {
		const name: string = req.body.name;
		try {
			await this.playerCreator.run({ name });
		} catch (error) {
			this.httpResponse.BadRequest(res, "player already exist");
			console.log(error);

			return;
		}
		this.httpResponse.Created(res, "Player created");
	}
}
