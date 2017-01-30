const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');


describe('testing 2Dobox search feature', function() {
  let driver;

  test.beforeEach(function() {
    this.timeout(10000);
    driver = new webdriver.Builder()
                          .forBrowser('chrome')
                          .build();
    driver.get('http://localhost:8080');
  });

  test.afterEach(()=> {
    driver.quit();
  });

  test.it('should allow the user to search the appended cards by title', function() {

    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester');
    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester');
    task.getAttribute('value').then((value)=> {
      assert.equal(value, 'task tester');
    });

    const button = driver.findElement({name: 'save'});
    button.click();

    const todo = driver.findElement({className: 'idea-card'});
    const search = driver.findElement({name: 'search'});
    search.sendKeys('title');
     todo.isDisplayed().then((value) => {
      assert.equal(value, true);
    });
  });

  test.it('should allow the user to search the appended cards by task description/body', function() {

    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester');
    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester');
    task.getAttribute('value').then((value)=> {
      assert.equal(value, 'task tester');
    });

    const button = driver.findElement({name: 'save'});
    button.click();

    const todo = driver.findElement({className: 'idea-card'});
    const search = driver.findElement({name: 'search'});
    search.sendKeys('task tester');
     todo.isDisplayed().then((value) => {
      assert.equal(value, true);
    });
  });

  test.it('should NOT show cards if the search terms do not match any current cards', function() {

    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester');
    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester');
    task.getAttribute('value').then((value)=> {
      assert.equal(value, 'task tester');
    });

    const button = driver.findElement({name: 'save'});
    button.click();

    const todo = driver.findElement({className: 'idea-card'});
    const search = driver.findElement({name: 'search'});
    search.sendKeys('z');
      todo.isDisplayed().then((value) => {
        assert.equal(value, false);
      });
  });

  test.it('should NOT show cards if the task search terms do not match any current cards', function() {

    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester');
    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester');
    task.getAttribute('value').then((value)=> {
      assert.equal(value, 'task tester');
    });

    const button = driver.findElement({name: 'save'});
    button.click();

    const todo = driver.findElement({className: 'idea-card'});
    const search = driver.findElement({name: 'search'});
    search.sendKeys('z');
     todo.isDisplayed().then((value) => {
      assert.equal(value, false);
    });
  });
});
