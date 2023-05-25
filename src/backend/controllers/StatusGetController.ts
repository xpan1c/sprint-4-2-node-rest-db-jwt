import { Request, Response } from "express";

import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { Controller } from "./Controller";

export default class StatusGetController implements Controller {
	constructor(private readonly httpResponse: HttpResponse) {}

	run(req: Request, res: Response): void {
		//		res.status(httpStatus.OK).send();
		this.httpResponse.Ok();
	}
}
