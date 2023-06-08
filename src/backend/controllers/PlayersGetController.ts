import { Request, Response } from "express";

import { PlayerGetter } from "../../Players/application/PlayerGetter";
import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { Controller } from "./Controller";

export class PlayersGetController implements Controller {
	constructor(
		private readonly playerGetter: PlayerGetter,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: Request, res: Response): Promise<void> {
		this.httpResponse.Ok(res, "Player updated");
	}
}
