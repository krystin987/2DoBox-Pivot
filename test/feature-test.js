const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

describe('testing 2Dobox', function() {
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

  test.it('should allow me to add a title and task', function() {

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
  });

  test.it('save button should add a new task to the page', () => {
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
    driver.findElements({tagName: 'ul'}).then((ul) => {
      assert.equal(ul.length, 0);
    });
  });

  test.it('should increase in importance when upvote button is clicked', () => {
    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester');
    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester');
    task.getAttribute('value').then((value) => {
      assert.equal(value, 'task tester');
    });

    const button = driver.findElement({name: 'save'});
    button.click();
    driver.findElements({tagName: 'h3'}).then((h3) => {
      assert.equal(h3.length, 1);
    });

    const upVoteButton = driver.findElement({className: 'up-btn'});
    upVoteButton.click();

    const importance = driver.findElement({className: 'task-quality'});
    importance.getText().then((importance) => {
      assert.equal(importance, 'High');
    });
  });

  test.it('should increase in importance when upvote button is clicked twice', () => {
    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester');
    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester');
    task.getAttribute('value').then((value) => {
      assert.equal(value, 'task tester');
    });

    const button = driver.findElement({name: 'save'});
    button.click();
    driver.findElements({tagName: 'h3'}).then((h3) => {
      assert.equal(h3.length, 1);
    });

    const upVoteButton = driver.findElement({className: 'up-btn'});
    upVoteButton.click();
    upVoteButton.click();

    const importance = driver.findElement({className: 'task-quality'});
    importance.getText().then((importance) => {
      assert.equal(importance, 'Critical');
  });
 });

 test.it('should decrease in importance when downvote button is clicked', () => {
   const title = driver.findElement({name: 'title'});
   title.sendKeys('Title tester');
   title.getAttribute('value').then((value) => {
     assert.equal(value, 'Title tester');
   });

   const task = driver.findElement({name: 'task'});
   task.sendKeys('task tester');
   task.getAttribute('value').then((value) => {
     assert.equal(value, 'task tester');
   });

   const button = driver.findElement({name: 'save'});
   button.click();
   driver.findElements({tagName: 'h3'}).then((h3) => {
     assert.equal(h3.length, 1);
   });

   const downVoteButton = driver.findElement({className: 'down-btn'});
   downVoteButton.click();

   const importance = driver.findElement({className: 'task-quality'});
   importance.getText().then((importance) => {
     assert.equal(importance, 'Low');
   });
 });

 test.it('should decrease in importance when downvote button is clicked twice', () => {
   const title = driver.findElement({name: 'title'});
   title.sendKeys('Title tester');
   title.getAttribute('value').then((value) => {
     assert.equal(value, 'Title tester');
   });

   const task = driver.findElement({name: 'task'});
   task.sendKeys('task tester');
   task.getAttribute('value').then((value) => {
     assert.equal(value, 'task tester');
   });

   const button = driver.findElement({name: 'save'});
   button.click();
   driver.findElements({tagName: 'h3'}).then((h3) => {
     assert.equal(h3.length, 1);
   });

   const downVoteButton = driver.findElement({className: 'down-btn'});
   downVoteButton.click();
   downVoteButton.click();

   const importance = driver.findElement({className: 'task-quality'});
   importance.getText().then((importance) => {
     assert.equal(importance, 'None');
   });
 });

 test.it('should add class of complete when clicked', () => {
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
   driver.findElements({tagName: 'h3'}).then((h3) => {
     assert.equal(h3.length, 1);
   });

   const completeBtn = driver.findElement({className: 'complete-btn'});
   completeBtn.click();
   const completeStatus = driver.findElement({className: 'idea-card'});
   completeStatus.getAttribute('class').then((complete) => {
     assert.equal(complete, 'idea-card complete');
   });
 });

  test.it('should hide completed tasks on page reload', () => {
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
    driver.findElements({tagName: 'h3'}).then((h3) => {
      assert.equal(h3.length, 1);
    });

    title.sendKeys('Title tester');
    task.sendKeys('task tester');
    button.click();

    const completeBtn = driver.findElement({className: 'complete-btn'});
    completeBtn.click();
    const completeStatus = driver.findElement({className: 'idea-card'});
    completeStatus.getAttribute('class').then((complete) => {
      assert.equal(complete, 'idea-card complete');
    });

    driver.navigate().refresh();
    const incompleteTasks = driver.findElement({tagName: 'article'});
    incompleteTasks.getAttribute('class').then((incomplete) => {
      assert.equal(incomplete, 'idea-card');
    });
  });

  test.it('should show completed tasks when the "show completed tasks" button is clicked', ()=> {
    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester');
    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester');
    task.getAttribute('value').then((value) => {
      assert.equal(value, 'task tester');
    });

    const button = driver.findElement({name: 'save'});
    button.click();

    const completeBtn = driver.findElement({className: 'complete-btn'});
    completeBtn.click();
    const completeStatus = driver.findElement({className: 'idea-card'});
    completeStatus.getAttribute('class').then((complete) => {
      assert.equal(complete, 'idea-card complete');
    });

    driver.navigate().refresh();
    const showCompletedTaskBtn = driver.findElement({className: 'show-complete'});
    showCompletedTaskBtn.click();
    const completedTasks = driver.findElement({tagName: 'article'});
    completedTasks.getAttribute('class').then((complete) => {
      assert.equal(complete, 'idea-card complete');
    });
  });


  test.it('should remove a task when the delete button is clicked', ()=> {
    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester');
    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester');
    task.getAttribute('value').then((value) => {
      assert.equal(value, 'task tester');
    });

    const button = driver.findElement({name: 'save'});
    button.click();

    title.sendKeys('Title tester');
    task.sendKeys('task tester');
    button.click();

    const deleteButton = driver.findElement({className: 'delete-btn'});
    deleteButton.click();

    driver.findElements({tagName: 'article'}).then((article) => {
      assert.equal(article.length, 1);
    });
  });

  test.it('should update the task title when edited', ()=> {
    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester');
    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester');
    task.getAttribute('value').then((value) => {
      assert.equal(value, 'task tester');
    });

    const button = driver.findElement({name: 'save'});
    button.click();

    title.clear();
    title.sendKeys('Second title');

    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Second title');
    });
  });

  test.it('should update the task body when edited', ()=> {
    const title = driver.findElement({name: 'title'});
    title.sendKeys('Title tester');
    title.getAttribute('value').then((value) => {
      assert.equal(value, 'Title tester');
    });

    const task = driver.findElement({name: 'task'});
    task.sendKeys('task tester');
    task.getAttribute('value').then((value) => {
      assert.equal(value, 'task tester');
    });

    const button = driver.findElement({name: 'save'});
    button.click();

    task.clear();
    task.sendKeys('Second body');

    task.getAttribute('value').then((value) => {
      assert.equal(value, 'Second body');
    });
  });

});
