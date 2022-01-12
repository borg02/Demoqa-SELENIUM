Feature: Remove item
  As a customer
  I want to be able to change the quantity in my cart so i can buy
  more or less of the product.

  Background:
    Given www.willys.se is opened
    And cookies has been accepted
    And that the delivery option was closed

  Scenario: Chance quantity
    Given the category Skafferi was selected
    And that a product was added to the basket
    When the user clicks + on the quantity button
    Then the product should have products quantity should have been added by 1