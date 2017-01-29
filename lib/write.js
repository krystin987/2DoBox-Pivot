class NewIdea {
  constructor (title, body, quality){
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.quality = quality || 'Normal';
    this.complete = 'idea-card';
  }
}

$(()=> {
  let taskKeys = Object.keys(localStorage);
  taskKeys.map(function(taskKey) {
    let storedTask = JSON.parse(localStorage[taskKey]);
    displayCard(storedTask);
    let completedTask = $('.card-section').find('.complete');
    completedTask.hide();
    if (completedTask.hasClass('complete')) {
      $('.show-complete').attr('disabled', false);
    }
  });
});

$('.show-complete').on('click', function(e) {
  e.preventDefault();
  $('.show-complete').toggleClass('completed');

  let completedTask = $('.card-section').find('.complete');
  completedTask.toggle();
});

$('.card-section').on('click', '.delete-btn', function() {
  let id = getID(this);
  $(this).closest('.idea-card').remove();
  localStorage.removeItem(id);
});

$('.card-section').on('click', '.complete-btn', function() {
  $(this).closest('.idea-card').toggleClass('complete');
  let id = getID(this);
  let idea = getIdea(id);
  let currentClass = $(this).closest('.idea-card').attr('class');
  idea.complete = currentClass;
  storeIdea(idea);

  $(this).addClass('completed');
});

$('.card-section').on('click', '.up-btn, .down-btn', function(e){
  let importance =  ["None", "Low", "Normal", "High", "Critical"];

  let upOrDown = e.currentTarget.className;
  let selector = $(this).closest('.idea-card').find('.task-quality');
  let id = getID(this);
  let idea = getIdea(id);
  let currentQuality = idea.quality;
  let currentIndex = importance.indexOf(currentQuality);

  if (upOrDown === 'up-btn' && currentIndex < 4 ) {
    idea.quality = importance[currentIndex + 1];
  } else if (upOrDown === 'down-btn' && currentIndex > 0) {
    idea.quality = importance[currentIndex - 1];
  }

  storeIdea(idea);
  selector.text(idea.quality);
});

$('.save-btn').on('click', ()=> {
  let $titleInput = $('.title-input').val();
  let $bodyInput = $('.body-input').val();
  let $idea = new NewIdea($titleInput, $bodyInput);
  displayCard($idea);
  storeIdea($idea);
  clearInputs();
});

$('.title-input, .body-input').keyup(()=> {
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

const getID = (selector) => {
  return $(selector).closest(".idea-card").attr("id");
};

const getIdea = (id) => {
  return JSON.parse(localStorage.getItem(id));
};

const storeIdea = (idea) => {
   localStorage.setItem(idea.id, JSON.stringify(idea));
};

const displayCard = (idea) => {
  $('.card-section').prepend(
    `<article id="${idea.id}" class="${idea.complete}">
      <button class="delete-btn"></button>
      <h3 class="task-title" contenteditable>${idea.title}</h3>
      <p class="task-body" contenteditable>${idea.body}</p>
      <footer class="task-footer">
        <button class="up-btn"></button>
        <button class="down-btn"></button>
        <p class="task-importance">Importance: <span class="task-quality">${idea.quality}</span></p>
        <button class="complete-btn">Complete task</button>
      </footer>
    </article>`
  );
};


$('.search-input').on('keyup', ()=> {
  let searchField = $('.search-input').val().toLowerCase();
  const cardBox = $('.idea-card');
  cardBox.each(function(index, task) {
    let taskText = $(task).text().toLowerCase();
    let matched = taskText.indexOf(searchField) !== -1;
    $(task).toggle(matched);
  });
});

const clearInputs = () => {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.save-btn').attr('disabled', true);
};
