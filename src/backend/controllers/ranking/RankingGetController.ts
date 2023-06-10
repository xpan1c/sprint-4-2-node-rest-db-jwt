import { Request, Response } from "express";

import { RankingGetter } from "../../../Players/application/RankingGetter";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

export class RankingGetController implements Controller {
	constructor(
		private readonly rankingGetter: RankingGetter,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: Request, res: Response): Promise<void> {
		const players = await this.rankingGetter.run();
		this.httpResponse.Ok(res, players);
	}
}
