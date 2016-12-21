$(function() {
  for (var i = 0; i < localStorage.length; i++){
    var storedObj = getIdea(localStorage.key(i));
    displayCard(storedObj);
  }
});

$('.card-section').on('click', '.delete-btn', function(){
  var id = $(this).closest(".idea-card").attr("id");
  localStorage.removeItem(id);
  $(this).closest('.idea-card').remove();
});

$('.card-section').on('click', '.up-btn', function(){
  var id = getID(this);
  var storedObj = getIdea(id);
  var selector = $(this).closest('.idea-card').find('.li-quality');
  var currentQuality = selector.text();
    if (currentQuality === "Swill"){
      currentQuality = "Plausible"
      storedObj.quality = currentQuality;
      selector.text(currentQuality)
    } else if (currentQuality === "Plausible") {
      currentQuality = "Genius"
      storedObj.quality = currentQuality;
      selector.text(currentQuality)
    }
    StoreIdea(id, storedObj);
});

$('.card-section').on('click', '.down-btn', function(){
  var id = getID(this);
  var storedObj = getIdea(id);
  var selector = $(this).closest('.idea-card').find('.li-quality');
  var currentQuality = selector.text();
    if (currentQuality === "Genius") {
      currentQuality = "Plausible"
      storedObj.quality = currentQuality;
      selector.text(currentQuality)
    } else if (currentQuality === "Plausible") {
      currentQuality = "Swill"
      storedObj.quality = currentQuality;
      selector.text(currentQuality)
    }
    StoreIdea(id, storedObj);
});

$('.js-save-btn').on('click', function(){
  var $titleInput = $('.js-title-input').val();
  var $bodyInput = $('.js-body-input').val();
  var $idea = new NewIdea($titleInput, $bodyInput);
  NewIdea();
  displayCard($idea);
  StoreIdea(id, $idea);
  clearInputs();
});

function NewIdea (title, body, quality){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality || 'Swill';
}

function getID(selector) {
  return $(selector).closest(".idea-card").attr("id");
}

function getIdea(id){
  return JSON.parse(localStorage.getItem(id));
};

function StoreIdea (id, idea){
   localStorage.setItem(id, JSON.stringify(idea));
};

function displayCard (idea){
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
    </ui>
  </section>`
  );
}

function clearInputs(){
  $('.js-title-input').val('');
  $('.js-body-input').val('');
};
