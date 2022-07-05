Feature: Emptying basket
  As a customer
  I want to be able to empty my shopping basket
  So that I can start from the beginning.

  Background:
    Given www.willys.se is opened
    And cookies has been accepted

  Scenario: Empty basket
    Given the category "Mejeri, ost & ägg" was selected
    Given that a product was added to the basket
    Given that the delivery option was closed
    Given that the basket is opened
    When the user clicks Empty Basket
    And the user clicks Empty in the confirmation dialog
    Then the basket is emptied
