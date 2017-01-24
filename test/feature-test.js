const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

describe('testing 2Dobox', function() {
  let driver
  test.beforeEach(()=> {
    this.timeout(1000000);
    driver = new webdriver.Builder()
                          .forBrowser('chrome')
                          .build();

    driver.get('http://localhost:8080');
 })
});
