Feature: Radio Button
  As a user
  I want to rate what I think about the site

  Background:
    Given Given demoqa.com radio-button is opened

  Scenario: Rate the site
    Given that a rating has been completed
    Then a text is displayed at the bottom of the form







