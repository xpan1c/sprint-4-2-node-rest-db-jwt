import { Request, Response } from "express";

import { GameCreatorResponse } from "../../../Games/application/GameCreatorResponse";
import { GameGetter } from "../../../Games/application/GameGetter";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

export class GamesGetController implements Controller {
	constructor(
		private readonly gameGetter: GameGetter,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		let games: GameCreatorResponse[];
		try {
			games = await this.gameGetter.run({ id });
		} catch (error) {
			if (error instanceof Error) {
				this.httpResponse.BadRequest(res, error.message);
			}
			console.log(error);

			return;
		}
		this.httpResponse.Ok(res, games);
	}
}
