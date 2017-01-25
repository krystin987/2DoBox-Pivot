$(function() {
  for (var i = 0; i < localStorage.length; i++){
    let storedObj = getIdea(localStorage.key(i));
    displayCard(storedObj);
  }
});

$('.card-section').on('click', '.delete-btn', function(){
  let id = $(this).closest(".idea-card").attr("id");
  $(this).closest('.idea-card').remove();
  localStorage.removeItem(id);
});

$('.card-section').on('click', '.up-btn', function(){
  let id = getID(this);
  let storedObj = getIdea(id);
  let selector = $(this).closest('.idea-card').find('.li-quality');
  let currentQuality = selector.text();
    if (currentQuality === "Swill"){
      currentQuality = "Plausible";body-input
      storedObj.quality = currentQuality;
      selector.text(currentQuality);
    } else if (currentQuality === "Plausible") {
      currentQuality = "Genius";
      storedObj.quality = currentQuality;
      selector.text(currentQuality);
    }
    storeIdea(id, storedObj);
});

$('.card-section').on('click', '.down-btn', function(){
  let id = getID(this);
  let storedObj = getIdea(id);
  let selector = $(this).closest('.idea-card').find('.li-quality');
  let currentQuality = selector.text();
    if (currentQuality === "Genius") {
      currentQuality = "Plausible";
      storedObj.quality = currentQuality;
      selector.text(currentQuality);
    } else if (currentQuality === "Plausible") {
      currentQuality = "Swill";
      storedObj.quality = currentQuality;
      selector.text(currentQuality);
    }
    storeIdea(id, storedObj);
});

$('.save-btn').on('click', function(){
  let $titleInput = $('.title-input').val();
  let $bodyInput = $('.body-input').val();
  let $idea = new NewIdea($titleInput, $bodyInput);
  displayCard($idea);
  storeIdea($idea.id, $idea);
  clearInputs();
});

$('.title-input, .body-input').keyup(function(){
  let $title = $('.title-input').val();
  let $body = $('.body-input').val();
    if ($title && $body){
      $('.save-btn').attr('disabled', false);
    } else {
      $('.save-btn').attr('disabled', true);
    }
});

 $('.card-section').on('blur', '.card-box', function(){
   let id = getID(this);
   let storedObj = getIdea(id);
   let selectorTitle = $(this).closest('.idea-card').find('.li-title');
   let selectorBody = $(this).closest('.idea-card').find('.li-body');
   let currentTitle = selectorTitle.text();
   let currentBody = selectorBody.text();
   storedObj.title = currentTitle;
   storedObj.body = currentBody;
   storeIdea(id, storedObj);
 });

class NewIdea {
  constructor (title, body, quality){
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.quality = quality || 'Normal';
  }
}

const getID = (selector) => {
  return $(selector).closest(".idea-card").attr("id");
}

const getIdea = (id) => {
  return JSON.parse(localStorage.getItem(id));
}

const storeIdea = (id, idea) => {
   localStorage.setItem(id, JSON.stringify(idea));
}

const displayCard = (idea) => {
  $('.card-section').prepend(
    `<section id="${idea.id}" class="idea-card">
    <ul class="card-box">
    <li class="li-title" contenteditable> ${idea.title} </li>
    <button class="delete-btn"></button>
    <li class="li-body" contenteditable>${idea.body}</li>
    <li id="key-number" class="li-id">"${idea.id}"</li>
    <button class="up-btn"></button>
    <button class="down-btn"></button>
    <li>quality: <span class="li-quality">${idea.quality}</span></li>
    </ul>
  </section>`
  );
}

$('.search-input').on('keyup', function(){
  let searchField = $(this).val().toLowerCase();
  const cardBox = $('.idea-card');
  cardBox.each(function(index, task){

    let taskText = $(task).text().toLowerCase();
    // let checkInput = $(task).text().indexOf(searchField) !== -1;
    let matched = taskText.indexOf(searchField) !== -1;
    $(task).toggle(matched);
      // if (checkInput) {
      //   $(title).parents('.idea-card').show();
      // } else {
      //   $(title).parents('.idea-card').hide();
      // }
  });
});

const clearInputs = () => {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.save-btn').attr('disabled', true);
}
