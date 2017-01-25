const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

describe('testing 2Dobox', function() {
  const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

  test.it('should allow me to add a title and task', function() {
    this.timeout(10000);
    driver.get('http://localhost:8080');

    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester')

    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester')

    task.getAttribute('value').then((value)=> {
      assert.equal(value, 'task tester');
    });
  });

  test.it('save button should add a new task to the page', ()=> {
    this.timeout(10000);
    const button = driver.findElement({name: 'save'});
    button.click();

    driver.findElements({tagName: 'ul'}).then((ul)=> {
      assert.equal(ul.length, 1);
    });
    driver.quit();
  });
 });
