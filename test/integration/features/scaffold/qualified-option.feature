Feature: Scaffold Qualified Option

  Scenario: Scaffold qualified plugin from options
    Given one of the plugins qualifies from the provided options
    When scaffolding the qualified plugin from options
    Then the qualified plugin is scaffolded

  Scenario: No plugins qualify
    Given none of the plugins qualify from the provided options
    When scaffolding the qualified plugin from options
    Then no scaffolding is performed

  Scenario: Multiple options qualify
    Given multiple plugins qualify from the provided options
    When scaffolding the qualified plugin from options
    Then an error is thrown indicating multiple options qualify

  Scenario: No plugins provided
    Given no plugins are provided
    When scaffolding the qualified plugin from options
    Then no scaffolding is performed
