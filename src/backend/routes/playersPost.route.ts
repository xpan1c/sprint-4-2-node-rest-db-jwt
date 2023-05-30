import { Router } from "express";

import { PlayerCreator } from "../../Contexts/Players/application/PlayerCreator";
import { UuidCreator } from "../../shared/application/UuidCreator";
import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { PlayersPostController } from "../controllers/PlayersPostController";

export const register = (router: Router): void => {
	const uuidCreator = new UuidCreator();
	//TODO falta implementar los repositorios
	const playerCreator = new PlayerCreator(uuidCreator);
	const httpResponse = new HttpResponse();
	const playersCtrl = new PlayersPostController(playerCreator, httpResponse);
	router.post("/players", playersCtrl.run.bind(playersCtrl));
};
