import { Router } from "express";

import { PlayersPostController } from "../controllers/PlayersPostController";

export const register = (router: Router): void => {
	const playersCtrl = new PlayersPostController();
	router.post("/players", playersCtrl.run.bind(playersCtrl));
};
