module.exports = function ()
{
  this.Given(/^that i am on the shopping site$/, async function ()
  {
    await helpers.loadPage('https://www.willys.se/');

    await driver.manage().setTimeouts({ implicit: 10000 });
    let cookieAcceptor = await driver.findElement(by.id('onetrust-accept-btn-handler'));
    await cookieAcceptor.click();
    await driver.sleep(1000);
  });

  this.Given(/^have added items to my shopping cart$/, async function () {
    let allButtons = await driver.findElements(By.css('button'));
    let acceptButton = allButtons[9];
    await acceptButton.click();
    await driver.sleep(1000);
  });

  this.When(/^I Enter the shopping cart$/, async function () {
    let allButtons = await driver.findElements(By.css('button'));
    let shoppingButton = allButtons[4];
    await shoppingButton.click();
    await driver.sleep(1000);
  });
  
  this.When(/^I should be able to see the items i have added$/, async function () {
    let shoppingCartText = await driver.findElements(By.css('[class^="md-list-item-text col-summary"]'));
    let hasShoppingCartText = shoppingCartText.includes('Majskyckling Hel Sverige'); 
  });


  this.When(/^an empty shopping cart should show up$/, async function () {
    let emptyShoppingCartText = await driver.findElements(By.id('selenium--miniCart-empty-info'));
    let hasEmptyShoppingCartText = emptyShoppingCartText.includes('Din varukorg är tom!');
  });
}
