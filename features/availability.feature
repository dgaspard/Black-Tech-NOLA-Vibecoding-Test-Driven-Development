@service
Feature: Availability
  Scenario: Allocate from available capacity
    Given the event starts with 2 available seats
    When availability allocates 1 seat
    Then the allocation succeeds
    And the event has 1 available seat

  Scenario: Reject an allocation that exceeds capacity
    Given the event starts with 1 available seat
    When availability allocates 2 seats
    Then the allocation is rejected
    And the event has 1 available seat
