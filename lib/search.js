$('.search-input').on('keyup', ()=> {
  let searchField = $('.search-input').val().toLowerCase();
  const cardBox = $('.idea-card');
  cardBox.each(function(index, task) {
    let taskText = $(task).text().toLowerCase();
    let matched = taskText.indexOf(searchField) !== -1;
    $(task).toggle(matched);
  });
});
