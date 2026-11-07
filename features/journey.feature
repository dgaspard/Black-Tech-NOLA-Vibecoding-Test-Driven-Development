@workflow
Feature: Reserve seats through the application
  Scenario: Jordan reserves one seat and Casey requests more than remain
    Given the local app starts with 5 available seats
    When Jordan requests 1 seat through the app
    Then the app confirms Jordan
    And the app shows 4 available seats

    When Casey requests 5 seats through the app
    Then the app rejects Casey because 4 seats remain
    And the app shows 4 available seats

  Scenario: The app starts with five seats by default
    Given the local app starts with its default capacity
    Then the app shows 5 available seats

  Scenario: One person reserves the last seat and another is rejected
    Given the local app starts with 1 available seat
    When Jordan requests 1 seat through the app
    Then the app confirms Jordan
    And the app shows 0 available seats
    When Casey requests 1 seat through the app
    Then the app rejects Casey because 0 seats remain
    And the app shows 0 available seats

  Scenario Outline: Invalid requests over HTTP leave availability unchanged
    Given the local app starts with 5 available seats
    When an HTTP reservation is submitted with name <name> and quantity <quantity>
    Then the HTTP reservation is rejected as invalid
    And the app shows 5 available seats

    Examples:
      | name     | quantity |
      | ""       | 1        |
      | "   "    | 1        |
      | "Jordan" | 0        |
      | "Jordan" | -1       |
      | "Jordan" | 1.5      |
      | "Jordan" | "two"    |
      | "Jordan" | null     |
