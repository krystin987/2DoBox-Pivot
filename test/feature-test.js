const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

describe('testing 2Dobox', function() {
  const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

  test.it.only('should allow me to add a title and description', function() {
    this.timeout(10000);
    driver.get('http://localhost:8080');


    });
    driver.quit();
 });
