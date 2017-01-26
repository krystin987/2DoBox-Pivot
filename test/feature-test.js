const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

describe('testing 2Dobox', function() {
  let driver

  test.beforeEach(function() {
    this.timeout(10000);
    driver = new webdriver.Builder()
                          .forBrowser('chrome')
                          .build();
    driver.get('http://localhost:8080');
  });

  test.afterEach(()=> {
    driver.quit();
  })

  test.it('should allow me to add a title and task', function() {

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

    const button = driver.findElement({name: 'save'});
    button.click();
    driver.findElements({tagName: 'ul'}).then((ul)=> {
      assert.equal(ul.length, 1);
    });
  });

  test.it('should increase in importance when upvote button is clicked', ()=> {
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

    const button = driver.findElement({name: 'save'});
    button.click();
    driver.findElements({tagName: 'ul'}).then((ul)=> {
      assert.equal(ul.length, 1);
    });

    const upVoteButton = driver.findElement({className: 'up-btn'});
    upVoteButton.click();

    const importance = driver.findElement({className: 'li-quality'});
    importance.getText().then((importance)=> {
      assert.equal(importance, 'High');
    });
  });

  test.it('should increase in importance when upvote button is clicked twice', ()=> {
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

    const button = driver.findElement({name: 'save'});
    button.click();
    driver.findElements({tagName: 'ul'}).then((ul)=> {
      assert.equal(ul.length, 1);
    });

    const upVoteButton = driver.findElement({className: 'up-btn'});
    upVoteButton.click();
    upVoteButton.click();

    const importance = driver.findElement({className: 'li-quality'});
    importance.getText().then((importance)=> {
      assert.equal(importance, 'Critical');
  });
 });

 test.it('should decrease in importance when downvote button is clicked', ()=> {
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

   const button = driver.findElement({name: 'save'});
   button.click();
   driver.findElements({tagName: 'ul'}).then((ul)=> {
     assert.equal(ul.length, 1);
   });

   const downVoteButton = driver.findElement({className: 'down-btn'});
   downVoteButton.click();

   const importance = driver.findElement({className: 'li-quality'});
   importance.getText().then((importance)=> {
     assert.equal(importance, 'Low');
   });
 });

 test.it('should decrease in importance when downvote button is clicked twice', ()=> {
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

   const button = driver.findElement({name: 'save'});
   button.click();
   driver.findElements({tagName: 'ul'}).then((ul)=> {
     assert.equal(ul.length, 1);
   });

   const downVoteButton = driver.findElement({className: 'down-btn'});
   downVoteButton.click();
   downVoteButton.click();

   const importance = driver.findElement({className: 'li-quality'});
   importance.getText().then((importance)=> {
     assert.equal(importance, 'None');
   });
 });
});
