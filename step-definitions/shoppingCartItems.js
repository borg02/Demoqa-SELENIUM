module.exports = function ()
{
  this.Given(/^that have added items to my shopping cart$/, async function () {
    let allButtons = await driver.findElements(By.css('button'));
    let acceptButton = allButtons[9];
    await acceptButton.click();
    await driver.sleep(3000);
  });

  this.Given(/^that it is the first time I am visiting the site$/, async function () {
    await driver.sleep(3000);
  });

  this.When(/^I Enter the shopping cart$/, async function () {
    let allButtons = await driver.findElements(By.css('button'));
    let shoppingButton = allButtons[4];
    await shoppingButton.click();
    await driver.sleep(3000);
  });
  
  this.Then(/^I should be able to see the items i have added$/, async function () {
    let shoppingCartText = await (await driver.findElement(By.css('[class^="ax-product-quantity-unit-st"]'))).getText();
    let hasShoppingCartText = shoppingCartText.includes('st');
    expect(hasShoppingCartText).to.be.true;
    await driver.sleep(3000);
  });



  this.Then(/^an empty shopping cart should show up$/, async function () {
    let emptyShoppingCartText = await (await driver.findElement(By.css('[class^="cart-mini-empty layout-margin layout-padding layout-align-center-center layout-column"]'))).getText();
    let hasEmptyShoppingCartText = emptyShoppingCartText.includes('Din varukorg är tom!');
    expect(hasEmptyShoppingCartText).to.be.true;
  });
}
