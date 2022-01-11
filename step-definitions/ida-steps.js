module.exports = function () {

  // Background steps

  this.Given('www.willys.se is opened', async function () {

    // Go to willys home page
    await helpers.loadPage('https://www.willys.se');

  });


  this.Given('cookies has been accepted', async function () {

    await driver.wait(until.elementLocated(By.id("onetrust-accept-btn-handler")), 10000);

    let cookieButton = await driver.findElement(By.id("onetrust-accept-btn-handler"));

    while (!(await cookieButton.isDisplayed())) {
      await driver.sleep(100);
    }

    cookieButton.click();
    await driver.sleep(1000);

  });


  // Shared steps

  this.Given(/^the category "([^"]*)" was selected$/, async function (string) {

    let categoryLink = await driver.findElement(By.css("a[title='" + string + "']"));
    categoryLink.click();

    await driver.sleep(1000);

  });


  this.Given('that a product was added to the basket', async function () {
    await driver.wait(until.elementLocated(By.css("button[title='Öka antal']")), 10000);

    let addButtons = await driver.findElements(By.css("button[title='Öka antal']"));
    let addButton = addButtons[0];
    await addButton.click();

    await driver.sleep(1000);
  });


  this.Given('that the delivery option was closed', async function () {
    await driver.wait(until.elementLocated(By.css("div[data-testid='backdrop']")), 10000);

    let backdrop = await driver.findElement(By.css("div[data-testid='backdrop']"));
    backdrop.click();

    await driver.sleep(1000);
  });


  this.Given('that the basket is opened', async function () {

    let basketButton = await driver.findElement(By.css("a[href='https://www.willys.se/varukorg']"));
    basketButton.click();

    await driver.sleep(2000);
  });


  // Empty basket steps

  this.When('the user clicks Empty Basket', async function () {

    let emptyButton = await driver.findElement(By.css("button[title='Töm Varukorgen']"));
    emptyButton.click();

    await driver.sleep(2000);

  });


  this.When('the user clicks Empty in the confirmation dialog', async function () {

    let confirmButton = await driver.findElement(By.css("button[title='Töm']"));
    confirmButton.click();

    await driver.sleep(2000);
  });


  this.Then('the basket is emptied', async function () {

    let emptyBasketTextElement = await driver.findElement(By.css("div[data-testid='cart-preview'] h2"));

    let text = await emptyBasketTextElement.getText();

    expect(text).to.equal("Din varukorg är tom!");

    await driver.sleep(2000);

  });



  // Remove item steps

  this.Given('that second product was added to the basket', async function () {
    await driver.wait(until.elementLocated(By.css("button[title='Öka antal']")), 10000);

    let addButtons = await driver.findElements(By.css("button[title='Öka antal']"));
    let addButton = addButtons[1];
    await addButton.click();

    await driver.sleep(1000);

  });


  this.Given('that third product was added to the basket', async function () {
    await driver.wait(until.elementLocated(By.css("button[title='Öka antal']")), 10000);

    let addButtons = await driver.findElements(By.css("button[title='Öka antal']"));
    let addButton = addButtons[2];
    await addButton.click();

    await driver.sleep(1000);

  });


  this.When('the user clicks on reduce button', async function () {
    await driver.wait(until.elementLocated(By.css("button[aria-label='Minska antal']")), 10000);

    let reduceButtons = await driver.findElements(By.css("button[aria-label='Minska antal']"));
    await reduceButtons[0].click();

    await driver.sleep(1000);

  });


  this.Then('one product is removed from the basket', async function () {
    await driver.sleep(2000);
    let reduceButtons = await driver.findElements(By.css("button[aria-label='Minska antal']"));

    let numberOfButtons = reduceButtons.length;

    expect(numberOfButtons).to.equal(2);

    await driver.sleep(2000);

  });

}
