Feature: The shopping cart and the items in it should show up
  As a user i want to see my shopping cart and 
  the items i have placed in it should show up so 
  that i am able to buy them


Background:
  Given that we are on Willy's website
  And that we accepted the standard cookie policy
  And that we have have been through the initial where to deliver popup



Scenario: Looking at my added items in the shopping cart
  Given that have added items to my shopping cart
  When I Enter the shopping cart
  Then I should be able to see the items i have added

Scenario: The shopping cart should show up when i click on the button for it
  Given that it is the first time I am visiting the site
  When I Enter the shopping cart
  Then an empty shopping cart should show up