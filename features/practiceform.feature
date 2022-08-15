Feature: Practice form
  As a user
  I want to fill in text into a textbox in a form
  So that I can submit it to the server

  Background:
    Given Given demoqa.com automation-practice-form is opened

  Scenario: Fill in every field
    Given something is filled in to every field
    When the user clicks the submit button
    Then your form pops up

  Scenario: Fill in a invalid mobile-number
    Given an invalid number is filled into Mobile field
    When the user clicks the submit button
    Then the mobile field displays an error
