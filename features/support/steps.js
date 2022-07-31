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
