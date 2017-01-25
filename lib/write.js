$(function() {
  for (var i = 0; i < localStorage.length; i++){
    var storedObj = getIdea(localStorage.key(i));
    displayCard(storedObj);
  }
});

$('.card-section').on('click', '.delete-btn', function(){
  var id = $(this).closest(".idea-card").attr("id");
  $(this).closest('.idea-card').remove();
  localStorage.removeItem(id);
});

$('.card-section').on('click', '.up-btn', function(){
  var id = getID(this);
  var storedObj = getIdea(id);
  var selector = $(this).closest('.idea-card').find('.li-quality');
  var currentQuality = selector.text();
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
  var id = getID(this);
  var storedObj = getIdea(id);
  var selector = $(this).closest('.idea-card').find('.li-quality');
  var currentQuality = selector.text();
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
  var $titleInput = $('.title-input').val();
  var $bodyInput = $('.body-input').val();
  var $idea = new NewIdea($titleInput, $bodyInput);
  displayCard($idea);
  storeIdea($idea.id, $idea);
  clearInputs();
});

$('.title-input, .body-input').keyup(function(){
  var $title = $('.title-input').val();
  var $body = $('.body-input').val();
    if ($title && $body){
      $('.save-btn').attr('disabled', false);
    } else {
      $('.save-btn').attr('disabled', true);
    }
});

 $('.card-section').on('blur', '.card-box', function(){
   var id = getID(this);
   var storedObj = getIdea(id);
   var selectorTitle = $(this).closest('.idea-card').find('.li-title');
   var selectorBody = $(this).closest('.idea-card').find('.li-body');
   var currentTitle = selectorTitle.text();
   var currentBody = selectorBody.text();
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
  var searchField = $(this).val().toLowerCase();
  $.each($(".li-title"), function(index, title){

    var titleBox = $(this).find(".li-title").text().toLowerCase();
    var checkInput = $(title).text().indexOf(searchField) !== -1;
      if (checkInput) {
        $(title).parents('.idea-card').show();
      } else {
        $(title).parents('.idea-card').hide();
      }
  });
});

const clearInputs = () => {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.save-btn').attr('disabled', true);
}
