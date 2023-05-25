import { Router } from "express";

import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import StatusGetController from "../controllers/StatusGetController";

export const register = (router: Router): void => {
	const statusCtrl = new StatusGetController(new HttpResponse());
	router.get(`/status`, statusCtrl.run.bind(statusCtrl));
};
