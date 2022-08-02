Feature: Text Box
  As a user
  I want to fill in text into a textbox in a form
  So that I can submit it to the server

  Background:
    Given Given demoqa.com text-box is opened

  Scenario: Fill in text in the full name field
    Given a text is filled into the full name field
    When the user clicks the submit button
    Then the text is displayed at the bottom of the form

  Scenario: Fill in text in the email field
    Given an email adress is filled in
    When the user clicks the submit button
    Then the email adress is displayed at the bottom of the form

  Scenario: Fill in text in the current address field
    Given an address is filled in the field
    When the user clicks the submit button
    Then the address is displayed at the bottom of the form

