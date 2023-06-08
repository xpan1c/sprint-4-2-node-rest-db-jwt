import { Request, Response } from "express";

import { PlayerCreator } from "../../Players/application/PlayerCreator";
import { PlayerCreatorResponse } from "../../Players/application/PlayerCreatorResponse";
import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { Controller } from "./Controller";

export class PlayersPostController implements Controller {
	constructor(
		private readonly playerCreator: PlayerCreator,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: Request, res: Response): Promise<void> {
		const name: string = req.body.name;
		let player: PlayerCreatorResponse;
		try {
			player = await this.playerCreator.run({ name });
		} catch (error) {
			if (error instanceof Error) {
				this.httpResponse.BadRequest(res, error.message);
			}
			console.log(error);

			return;
		}
		this.httpResponse.Created(res, player);
	}
}
