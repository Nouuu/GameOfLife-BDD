Feature: Simple maths
  In order to do maths
  As a developer
  I want to increment variables

  Scenario: easy maths
    Given a variable is set to 11
    When I increment this variable by 1
    Then the variable should contain 12
