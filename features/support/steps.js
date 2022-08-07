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

After(async function () {
  await driver.sleep(3000);
  return driver.quit();
}, this);

//////////////////////
// STEP DEFINITIONS //
//////////////////////

// demoqa.com/text-box

Given('Given demoqa.com text-box is opened', { timeout: 60000 }, async function () {

  // Load the web page
  await loadPage('https://demoqa.com/text-box');

  // Remove the <footer> element
  driver.executeScript('return document.getElementsByTagName("footer")[0].remove();');

  // Remove the "fixedban" div
  driver.executeScript('return document.getElementById("fixedban")?.remove();');

});


Given('a text is filled into the full name field', { timeout: 60000 }, async function () {

  // Find the "Full Name" input field element (it has the id "userName")
  let userNameElement = await driver.findElement(By.id("userName"));

  // Type some text into the field
  userNameElement.sendKeys("Hello world!");

});


When('the user clicks the submit button', { timeout: 60000 }, async function () {

  // Find the "Submit" button
  let submitButton = await driver.findElement(By.id("submit"));

  // Scroll the webpage so that the button is visible
  await driver.executeScript("arguments[0].scrollIntoViewIfNeeded(true);", submitButton);

  // Click the button
  await submitButton.click();

});


Then('the text is displayed at the bottom of the form', { timeout: 60000 }, async function () {

  // Wait until the "name" element is visible at the bottom of the form (it has the id "name")
  await driver.wait(until.elementLocated(By.id("name")), 10000);

  // Find the element by it's id
  let nameElement = await driver.findElement(By.id("name"));

  // Get the text from element
  let text = await nameElement.getText();

  // Assert that the text is correct
  expect(text).to.equal("Name:Hello world!");

});


Given('an email adress is filled in', async function () {
  // Find the "Email" input field element (it has the id "userEmail")
  let userEmailElement = await driver.findElement(By.id("userEmail"));

  // Type some text into the field
  userEmailElement.sendKeys("hej@gmail.com");
});


Then('the email adress is displayed at the bottom of the form', async function () {
  // Wait until the "email" element is visible at the bottom of the form (it has the id "email")
  await driver.wait(until.elementLocated(By.id("email")), 10000);

  // Find the element by it's id
  let emailElement = await driver.findElement(By.id("email"));

  // Get the text from element
  let text = await emailElement.getText();

  // Assert that the text is correct
  expect(text).to.equal("Email:hej@gmail.com");
});


Given('an address is filled in the field', async function () {
  // Find the "Current Address" input field element (it has the id "currentAddress")
  let currentAddressElement = await driver.findElement(By.id("currentAddress"));

  // Type some text into the field
  currentAddressElement.sendKeys("Tagenevagen 29");
});


Then('the address is displayed at the bottom of the form', async function () {
  // Wait until the "Current Address" element is visible at the bottom of the form (it has the id "currentAddress")
  await driver.wait(until.elementLocated(By.id("currentAddress")), 10000);

  // Find the element by a css selector: Find the element <p> inside an element with id="output"
  let currentAddressElement = await driver.findElement(By.css("#output p"));

  // Get the text from element
  let text = await currentAddressElement.getText();

  // Assert that the text is correct
  expect(text).to.equal("Current Address :Tagenevagen 29");
});


Given('an permanent address is filled in the field', async function () {
  // Find the "Permanent Address" input field element (it has the id "permanentAddress")
  let permanentAddressElement = await driver.findElement(By.id("permanentAddress"));

  // Type some text into the field
  permanentAddressElement.sendKeys("Tagenevagen 35");
});


Then('the permanent address is displayed at the bottom of the form', async function () {
  await driver.wait(until.elementLocated(By.id("permanentAddress")), 10000);

  // Find the element by a css selector: Find the element <p> inside an element with id="output"
  let permanentAddressElement = await driver.findElement(By.css("#output p"));

  // Get the text from element
  let text = await permanentAddressElement.getText();

  // Assert that the text is correct
  expect(text).to.equal("Permananet Address :Tagenevagen 35");
});


///////////////////////////////////////////////////////////////////////////////////////////////////


Given('Given demoqa.com checkbox is opened', async function () {
  // Load the web page
  await loadPage('https://demoqa.com/checkbox');

  // Remove the <footer> element
  driver.executeScript('return document.getElementsByTagName("footer")[0].remove();');

  // Remove the "fixedban" div
  driver.executeScript('return document.getElementById("fixedban")?.remove();');
});

Given('the home folder is expanded', async function () {
  let homeFolderButton = await driver.findElement(By.css("#tree-node ol button"));

  // Click the button
  await homeFolderButton.click();
});

When('the desktop checkbox is checked', async function () {
  let desktopFolderCheckbox = await driver.findElement(By.xpath("//label[@for='tree-node-desktop']"));

  // Click the checkbox
  await desktopFolderCheckbox.click();
});

Then('the folders inside desktop has also been checked', async function () {
  await driver.wait(until.elementLocated(By.id("result")), 10000);

  // Find the element by a css selector: Find the elements <span> inside an element with id="result"
  let results = await driver.findElements(By.css("#result span"));

  // Get the text from element
  let result1 = await results[1].getText();
  let result2 = await results[2].getText();
  let result3 = await results[3].getText();

  // Assert that the text is correct
  expect(result1).to.equal("desktop");
  expect(result2).to.equal("notes");
  expect(result3).to.equal("commands");
});