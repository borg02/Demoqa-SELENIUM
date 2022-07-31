'use strict';

var chromedriver = require('chromedriver');
var selenium = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');

/**
 * Creates a Selenium WebDriver using Chrome as the browser
 */
module.exports = function () {

    var options = new chrome.Options();
    options.excludeSwitches('enable-logging');
    var driver = new selenium.Builder().forBrowser('chrome').withCapabilities(options).build();

    driver.manage().window().setRect({ width: 1024, height: 768 });

    return driver;
};
