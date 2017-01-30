import {NewIdea} from './task';
import {getID, getIdea, storeIdea, clearInputs, displayCard} from './helper';

$(()=> {
  let taskKeys = Object.keys(localStorage);
  taskKeys.map(function(taskKey) {
    let storedTask = JSON.parse(localStorage[taskKey]);
    if (storedTask.complete === 'idea-card') {
      displayCard(storedTask);
    }
    if (storedTask.complete === 'idea-card complete') {
      $('.show-complete').prop('disabled', false);
    }
  });
});

$('.show-complete').on('click', function(e) {
  e.preventDefault();
  let taskKeys = Object.keys(localStorage);
  taskKeys.map(function(taskKey) {
    let storedTask = JSON.parse(localStorage[taskKey]);
    if (storedTask.complete === 'idea-card complete') {
      displayCard(storedTask);
    }
    if (storedTask.complete === 'idea-card complete') {
      $('.show-complete').prop('disabled', true);
    }
  });
});

$('.card-section').on('click', '.delete-btn', function() {
  let id = getID(this);
  $(this).closest('.idea-card').remove();
  localStorage.removeItem(id);
});

$('.card-section').on('click', '.complete-btn', function() {
  $(this).closest('.idea-card').toggleClass('complete');
  $(this).toggleClass('completed');
  let id = getID(this);
  let idea = getIdea(id);
  let currentClass = $(this).closest('.idea-card').attr('class');
  let buttonClass = $(this).attr('class');
  idea.complete = currentClass;
  idea.class = buttonClass;
  storeIdea(idea);
});

$('.card-section').on('click', '.up-btn, .down-btn', function(e){
  let importance =  ["None", "Low", "Normal", "High", "Critical"];
  let upOrDown = e.currentTarget.className;
  let taskImportance = $(this).closest('.idea-card').find('.task-quality');
  let id = getID(this);
  let idea = getIdea(id);
  let currentQuality = idea.quality;
  let currentIndex = importance.indexOf(currentQuality);
  if (upOrDown === 'up-btn' && currentIndex < 4 ) {
    idea.quality = importance[currentIndex + 1];
  } else if (upOrDown === 'down-btn' && currentIndex > 0) {
    idea.quality = importance[currentIndex - 1];
  }
  taskImportance.text(idea.quality);
  storeIdea(idea);
});

$('.save-btn').on('click', function() {
  let $titleInput = $('.title-input').val();
  let $bodyInput = $('.body-input').val();
  let $idea = new NewIdea($titleInput, $bodyInput);
  displayCard($idea);
  storeIdea($idea);
  clearInputs();
});

$('.body-input').on('keyup', function() {
  let maxLength = 120;
  let taskLength = $('.body-input').val().length;
  let charCount = maxLength - taskLength;
  $('.char-count').text(charCount);
  if (charCount <= 0) {
    $('.save-btn').prop('disabled', true);
  }
});

$('.title-input, .body-input').on('keyup', function () {
  let $title = $('.title-input').val();
  let $body = $('.body-input').val();
    if ($title && $body){
      $('.save-btn').attr('disabled', false);
    } else {
      $('.save-btn').attr('disabled', true);
    }
});

 $('.card-section').on('blur', '.idea-card', function() {
   let id = getID(this);
   let task = getIdea(id);
   let taskTitle = $(this).find('.task-title').text();
   let taskBody = $(this).find('.task-body').text();
   task.title = taskTitle;
   task.body = taskBody;
   storeIdea(task);
 });
