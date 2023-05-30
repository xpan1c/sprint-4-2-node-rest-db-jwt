import { Request, Response } from "express";

import { Controller } from "./Controller";

export class PlayersPostController implements Controller {
	run(req: Request, res: Response): void {
		throw new Error("Method not implemented.");
	}
}
