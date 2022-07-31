Feature: Remove item
  As a customer
  I want to be able to remove a product I put in my basket
  So that i can regret what I put in my basket.

  Background:
    Given www.willys.se is opened
    And cookies has been accepted

  Scenario: Empty basket
    Given the category "Mejeri, ost & ägg" was selected
    Given that a product was added to the basket
    Given that the delivery option was closed
    Given that second product was added to the basket
    Given that third product was added to the basket
    Given that the basket is opened
    When the user clicks on reduce button
    Then one product is removed from the basket
