import { Request, Response } from "express";

import { PlayerUpdater } from "../../../Players/application/PlayerUpdater";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

export class PlayerPutController implements Controller {
	constructor(
		private readonly playerUpdater: PlayerUpdater,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: Request, res: Response): Promise<void> {
		const name: string = req.body.name;
		const id: string = req.params.id;
		try {
			await this.playerUpdater.run({ id, name });
		} catch (error) {
			if (error instanceof Error) {
				this.httpResponse.BadRequest(res, error.message);
			}
			console.log(error);

			return;
		}
		this.httpResponse.Ok(res, "Player updated");
	}
}
