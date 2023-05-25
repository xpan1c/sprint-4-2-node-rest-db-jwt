import { AfterAll, BeforeAll, Given, Then } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";

import { App } from "../../../src/backend/App";

let _request: request.Test;
let application: App;
let _response: request.Response;

Given("I send a GET request to {string}", (route: string) => {
	_request = request(application.httpServer).get(route);
});

Then("the response status code should be {int}", async (status: number) => {
	_response = await _request.expect(status);
});
Then("the response body should be:", (response: string) => {
	assert.deepStrictEqual(_response.body, JSON.parse(response));
});

BeforeAll(() => {
	application = new App();
	application.start();
});

AfterAll(() => {
	application.stop();
});
