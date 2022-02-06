Feature: Board generation with random values
  As a programmer of Conway's Game of Life
  I can generate a random board


  Scenario: No size
    Given I want a 0x0 random generated board
    When I generate the random cellArray with classic random
    Then I should see an empty cellArray

  Scenario: All alive
    Given I want a 10x10 random generated board
    When I generate the random cellArray with classic random and -0.1 threshold
    Then I should see the following cellArray
      | x | x | x | x | x | x | x | x | x | x |
      | x | x | x | x | x | x | x | x | x | x |
      | x | x | x | x | x | x | x | x | x | x |
      | x | x | x | x | x | x | x | x | x | x |
      | x | x | x | x | x | x | x | x | x | x |
      | x | x | x | x | x | x | x | x | x | x |
      | x | x | x | x | x | x | x | x | x | x |
      | x | x | x | x | x | x | x | x | x | x |
      | x | x | x | x | x | x | x | x | x | x |
      | x | x | x | x | x | x | x | x | x | x |


  Scenario: All dead
    Given I want a 10x10 random generated board
    When I generate the random cellArray with classic random and 1.1 threshold
    Then I should see the following cellArray
      | . | . | . | . | . | . | . | . | . | . |
      | . | . | . | . | . | . | . | . | . | . |
      | . | . | . | . | . | . | . | . | . | . |
      | . | . | . | . | . | . | . | . | . | . |
      | . | . | . | . | . | . | . | . | . | . |
      | . | . | . | . | . | . | . | . | . | . |
      | . | . | . | . | . | . | . | . | . | . |
      | . | . | . | . | . | . | . | . | . | . |
      | . | . | . | . | . | . | . | . | . | . |
      | . | . | . | . | . | . | . | . | . | . |


  Scenario: Alternate alive & dead
    Given I want a 5x5 random generated board
    When I generate the random cellArray with alternate random
    Then I should see the following cellArray
      | . | x | . | x | . |
      | x | . | x | . | x |
      | . | x | . | x | . |
      | x | . | x | . | x |
      | . | x | . | x | . |

  Scenario: Board random cellArray builder
    Given I want a 5x5 random generated board
    When I generate the board
    Then The given generator method should have been called
