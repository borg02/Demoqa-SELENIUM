module.exports = function () {


  this.Given(/^that it is the first time I am visiting the site$/, async function () {
    await driver.sleep(1000);
  });

  this.When(/^I click on a product$/, async function () {

    let allButtons = await driver.findElements(By.css('img'));
    let shoppingButton = allButtons[1];
    await shoppingButton.click();
    await driver.sleep(2000);

  });

  this.Then(/^the product page should display$/, async function () {



    let shoppingCartText = await (await driver.findElement(By.id('selenium--product-detail-title'))).getText();
    let hasShoppingCartText = shoppingCartText.includes('Ägg 10p Inne L');
    expect(hasShoppingCartText).to.be.true;


  });









}