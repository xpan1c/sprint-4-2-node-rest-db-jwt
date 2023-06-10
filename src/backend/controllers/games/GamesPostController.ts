import { Request, Response } from "express";

import { GameCreator } from "../../../Games/application/GameCreator";
import { GameCreatorResponse } from "../../../Games/application/GameCreatorResponse";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

export class GamesPostController implements Controller {
	constructor(
		private readonly gameCreator: GameCreator,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		let game: GameCreatorResponse;
		try {
			game = await this.gameCreator.run({ id });
		} catch (error) {
			if (error instanceof Error) {
				this.httpResponse.BadRequest(res, error.message);
			}
			console.log(error);

			return;
		}
		this.httpResponse.Created(res, game);
	}
}
