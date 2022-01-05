module.exports = function ()
{
  this.Given(/^that have added items to my shopping cart$/, async function () {
    let allButtons = await driver.findElements(By.css('button'));
    let acceptButton = allButtons[9];
    await acceptButton.click();
    await driver.sleep(1000);
  });

  this.Given(/^that it is the first time I am visiting the site$/, async function () {
    await driver.sleep(1000);
  });

  this.When(/^I Enter the shopping cart$/, async function () {
    let allButtons = await driver.findElements(By.css('button'));
    let shoppingButton = allButtons[4];
    await shoppingButton.click();
    await driver.sleep(1000);
  });
  
  this.Then(/^I should be able to see the items i have added$/, async function () {
    let shoppingCartText = await driver.findElements(By.css('[class^="md-list-item-text col-summary"]'));
    let hasShoppingCartText = shoppingCartText.includes('Majskyckling Hel Sverige'); 
  });



  this.Then(/^an empty shopping cart should show up$/, async function () {
    let emptyShoppingCartText = await driver.findElements(By.id('selenium--miniCart-empty-info'));
    let hasEmptyShoppingCartText = emptyShoppingCartText.includes('Din varukorg är tom!');
  });
}
