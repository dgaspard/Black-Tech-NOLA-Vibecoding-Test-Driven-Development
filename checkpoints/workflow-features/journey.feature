@workflow
Feature: Reserve the last seat through the application
  Scenario: Jordan gets the last seat and Casey is rejected
    Given the local app starts with 1 available seat
    When Jordan requests 1 seat through the app
    Then the app confirms Jordan
    And the app shows 0 available seats
    When Casey requests 1 seat through the app
    Then the app rejects Casey because no seats remain
    And the app shows 0 available seats
