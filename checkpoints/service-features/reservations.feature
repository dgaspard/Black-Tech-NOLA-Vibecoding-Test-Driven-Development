@service
Feature: Reservation outcomes
  Scenario: Jordan reserves a seat
    Given the event starts with 5 available seats
    When Jordan reserves 1 seat
    Then Jordan has a confirmed reservation
    And the event has 1 available seat

  Scenario: Reject the entire request when there are too few seats
    Given the event starts with 1 available seat
    When Jordan reserves 2 seats
    Then Jordan receives an insufficient availability rejection
    And the event has 1 available seat

  Scenario: Reserve exactly the remaining capacity
    Given the event starts with 2 available seats
    When Jordan reserves 2 seats
    Then Jordan has a confirmed reservation
    And the event has 0 available seats
