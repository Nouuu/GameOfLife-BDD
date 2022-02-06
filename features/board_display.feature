Feature: Display Board
  In order to display the board on a CLI or other String stream.
  I can get the current state of the board in a string


  Scenario: Fill a board of 1:1 with an inactive cell
    Given the following setup
      | . |
    When I retrieve the board as string
    Then I should get
  """
  | . |

  """

  Scenario: Fill a board of 1:1 with an active cell
    Given the following setup
      | x |
    When I retrieve the board as string
    Then I should get
  """
  | x |

  """

  Scenario: Fill a board with a single line
    Given the following setup
      | x | x | x |
    When I retrieve the board as string
    Then I should get
  """
  | x | x | x |

  """

  Scenario: Fill a board with a multiple line but one column
    Given the following setup
      | x |
      | . |
      | . |
      | x |
    When I retrieve the board as string
    Then I should get
  """
  | x |
  | . |
  | . |
  | x |

  """

  Scenario: Fill a board with a bigger board
    Given the following setup
      | x | x | x | . | x |
      | . | x | x | x | . |
      | . | . | . | x | x |
      | x | . | . | . | . |
    When I retrieve the board as string
    Then I should get
  """
  | x | x | x | . | x |
  | . | x | x | x | . |
  | . | . | . | x | x |
  | x | . | . | . | . |

  """
