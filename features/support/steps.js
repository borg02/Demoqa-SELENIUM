const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { until, By, Key } = require('selenium-webdriver');
let ChromeDriver = require('./chromeDriver.js');
let expect = require('chai').expect;

global.DEFAULT_TIMEOUT = global.DEFAULT_TIMEOUT || 10 * 1000;

let driver;

const loadPage = (url, waitInSeconds) => {

  // use either passed in timeout or global default
  var timeout = (waitInSeconds) ? (waitInSeconds * 1000) : DEFAULT_TIMEOUT;

  // load the url and wait for it to complete
  return driver.get(url).then(function () {

    // now wait for the body element to be present
    return driver.wait(until.elementLocated(By.css('body')), timeout);
  });
};

Before(function () {
  driver = new ChromeDriver();
}, this);

After(function () {
  return driver.quit();
}, this);

//////////////////////
// STEP DEFINITIONS //
//////////////////////

// /^ = Start of regular expression
// $/ = End of regular expression

// Willys 1

Given('www.willys.se is opened', async function () {
  // Go to willys home page
  await loadPage('https://www.willys.se');
});


Given('cookies has been accepted', async function () {

  await driver.wait(until.elementLocated(By.id("onetrust-accept-btn-handler")), 10000);

  let cookieButton = await driver.findElement(By.id("onetrust-accept-btn-handler"));

  while (!(await cookieButton.isDisplayed())) {
    await driver.sleep(100);
  }

  cookieButton.click();
  await driver.sleep(1000);
});


Given('the category {string} was selected', async function (string) {
  let categoryLink = await driver.findElement(By.css("a[title='" + string + "']"));
  categoryLink.click();

  await driver.sleep(1000);
});


Given('that a product was added to the basket', async function () {
  await driver.wait(until.elementLocated(By.css("button[title='Öka antal']")), 10000);

  let addButtons = await driver.findElements(By.css("button[title='Öka antal']"));
  let addButton = addButtons[0];
  await addButton.click();

  await driver.sleep(1000);
});

When('the user clicks Empty Basket', async function () {

  let emptyButton = await driver.findElement(By.css("button[title='Töm Varukorgen']"));
  emptyButton.click();

  await driver.sleep(2000);

});


When('the user clicks Empty in the confirmation dialog', async function () {

  let confirmButton = await driver.findElement(By.css("button[title='Töm']"));
  confirmButton.click();

  await driver.sleep(2000);
});


Then('the basket is emptied', async function () {

  let emptyBasketTextElement = await driver.findElement(By.css("div[data-testid='cart-preview'] h2"));

  let text = await emptyBasketTextElement.getText();

  expect(text).to.equal("Din varukorg är tom!");

  await driver.sleep(2000);

});



// Willys 2

Given('that second product was added to the basket', async function () {
  await driver.wait(until.elementLocated(By.css("button[title='Öka antal']")), 10000);

  let addButtons = await driver.findElements(By.css("button[title='Öka antal']"));
  let addButton = addButtons[1];
  await addButton.click();

  await driver.sleep(1000);

});


Given('that the delivery option was closed', async function () {
  await driver.wait(until.elementLocated(By.css("div[data-testid='backdrop']")), 10000);

  let backdrop = await driver.findElement(By.css("div[data-testid='backdrop']"));
  backdrop.click();

  await driver.sleep(1000);
});


Given('that third product was added to the basket', async function () {
  await driver.wait(until.elementLocated(By.css("button[title='Öka antal']")), 10000);

  let addButtons = await driver.findElements(By.css("button[title='Öka antal']"));
  let addButton = addButtons[2];
  await addButton.click();

  await driver.sleep(1000);

});


Given('that the basket is opened', async function () {

  let basketButton = await driver.findElement(By.css("a[href='https://www.willys.se/varukorg']"));
  basketButton.click();

  await driver.sleep(2000);
});


When('the user clicks on reduce button', async function () {
  await driver.wait(until.elementLocated(By.css("button[aria-label='Minska antal']")), 10000);

  let reduceButtons = await driver.findElements(By.css("button[aria-label='Minska antal']"));
  await reduceButtons[0].click();

  await driver.sleep(1000);

});


Then('one product is removed from the basket', async function () {
  await driver.sleep(2000);
  let reduceButtons = await driver.findElements(By.css("button[aria-label='Minska antal']"));

  let numberOfButtons = reduceButtons.length;

  expect(numberOfButtons).to.equal(2);

  await driver.sleep(2000);

});


