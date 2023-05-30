Feature: Create a new player
    Scenario: A valid non existing player
        Given a player name "John"
        When I send a POST request to "/players" with this player
        Then the response status code should be 201