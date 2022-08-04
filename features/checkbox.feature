Feature: Check Box
  As a user
  I want to check boxes
  So that I can submit it to the server

  Background:
    Given Given demoqa.com checkbox is opened

  Scenario: Check the desktop checkbox
    Given the home folder is expanded
    When the desktop checkbox is checked
    Then the folders inside desktop has also been checked


