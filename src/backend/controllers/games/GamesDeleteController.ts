import { Request, Response } from "express";

import { GameDestroyer } from "../../../Games/application/GameDestroyer";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

export class GamesDeleteController implements Controller {
	constructor(
		private readonly gameDestroyer: GameDestroyer,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		try {
			await this.gameDestroyer.run({ id });
		} catch (error) {
			if (error instanceof Error) {
				this.httpResponse.BadRequest(res, error.message);
			}
			console.log(error);

			return;
		}
		this.httpResponse.Ok(res, "Games deleted successfully");
	}
}
