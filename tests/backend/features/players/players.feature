Feature: Player Management in the Dice Game
    Scenario: A valid non existing player
        Given a player name "John"
        When I send a POST request to "/players" with this player
        Then the response status code should be 201
    Scenario: A valid existing player
        Given a player name "John"
        When I send a POST request to "/players" with this player
        Then the response status code should be 400
    Scenario: Creating a new anonymous player
        Given a player name ""
        When I send a POST request to "/players" with this player
        Then the response status code should be 201
    Scenario: Modifying the name of a player
        Given there is a player with the identifier "{id}"
        When a PUT request is made to "/players/{id}" with the new name "Charlie"
        Then the name of the player with the identifier "{id}" is changed to "Charlie"