import { Request, Response } from "express";

import { RankingWinnerLoserGetter } from "../../../Players/application/RankingWinnerLoserGetter";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

export class RankingWinnerLoserGetController implements Controller {
	constructor(
		private readonly winnerLoserGetter: RankingWinnerLoserGetter,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: Request, res: Response): Promise<void> {
		const isWinner = req.params.type === "winner";
		const data = await this.winnerLoserGetter.run(isWinner);
		this.httpResponse.Ok(res, data);
	}
}
