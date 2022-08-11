Feature: Check Box
  As a user
  I want to fill in text into a textbox in a form
  So that I can submit it to the server

  Background:
    Given Given demoqa.com automation-practice-form is opened

  Scenario: Fill in text in the first name field
    Given a text is filled into every field
    When the user clicks the submit button
    Then your form pops up


