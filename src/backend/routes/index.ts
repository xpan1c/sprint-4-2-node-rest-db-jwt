import { Router } from "express";
import * as glob from "glob";
import * as path from "path";

export function registerRoutes(router: Router): void {
	const normalizedDirname = path.normalize(__dirname).replace(/\\/g, "/");
	const routes = glob.sync(`${normalizedDirname}/*.route.*`);
	routes.map((route) => register(route, router));
}

function register(routePath: string, router: Router) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
	const routeModule = require(routePath);
	if (typeof routeModule === "function") {
		routeModule(router);
	} else if (routeModule && typeof routeModule.register === "function") {
		routeModule.register(router);
	} else {
		console.error(`No register function found in module ${routePath}`);
	}
}
