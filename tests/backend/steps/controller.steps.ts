import { Given, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";

import { application } from "./hooks.steps";

let _request: request.Test;
let _response: request.Response;
let player: JSON;

Given("I send a GET request to {string}", (route: string) => {
	_request = request(application.httpServer).get(route);
});

Then("the response status code should be {int}", async (status: number) => {
	_response = await _request.expect(status);
});
Then("the response body should be:", (response: string) => {
	assert.deepStrictEqual(_response.body, JSON.parse(response));
});
Given("a player name {string}", (name: string) => {
	// Write code here that turns the phrase above into concrete actions
	player = JSON.parse(`{"name": "${name}"}`);
});
When("I send a POST request to {string} with this player", (route: string) => {
	// Write code here that turns the phrase above into concrete actions
	_request = request(application.httpServer).post(route).send(player);
});
