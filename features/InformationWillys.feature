Feature: Clicking on a product
  As a user i want to see more information about product when i click on it


  Background:
    Given that we are on Willy's website
    And that we accepted the standard cookie policy
    And that we have have been through the initial where to deliver popup





  Scenario: See more information about a product when I click on it
    Given that it is the first time I am visiting the site

    When I click on a product
    Then the product page should display



