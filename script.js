$(document).ready(() => {

const arrayTask = [];

$( function() {
  $( ".canban" ).sortable({
    connectWith: ".canban"
  }).disableSelection();
} );

$(document).on('mousedown', '.canban li', function() {
$(this).addClass("rotate");
});

$(document).on('mouseup', '.canban li', function() {
  $(this).removeClass("rotate");
  });

$(document).on('click', '.mybtn', function() {
  let str = '';
  arrayTask.forEach((item) => {
    str += `<li id=${item.id} class="list-group-item">${item.headline}</li>`;
  });
  $(this.previousElementSibling).html(str+`<li class="list-group-item"><input class="headline"></input></li>`);
  $('.headline').focus();
  // console.log(arrayTask);
});

$(document).on('blur', '.headline', function back() {
  $(this).replaceWith(`<span class="content">${this.value}</span>`);
  const newTask = {
    headline: this.value,
    description: '',
    isChecked: false,
    id: Date.now(),
  };

  arrayTask.push(newTask);
  console.log(arrayTask);
});

$(document).on('keydown', '.headline', function enter(event) {
  if (event.which === 13) {
  $(this).replaceWith(`<span class="content">${this.value}</span>`);
  }
});

$(document).on('click', '#new-list', function() {

});
});
