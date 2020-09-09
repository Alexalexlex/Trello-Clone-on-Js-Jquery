$(document).ready(() => {

let arrayTask = [];
let cols = new Map ();

// Drag N Drop
const drag = function() {
  $( function() {
    $( '.canban ' ).sortable({
      connectWith: ".canban"
    }).disableSelection();
  } );
  }

// render cols and task

const render = function() {
  let strcol = ``;
  for(let headline of cols.keys()){
    let str = '';
    cols.get(headline).forEach((item) => {
    str += `<li id=${item.id} class="list-group-item">${item.headline}</li>`;
  })
    strcol+= `<div class="box">
    <h5>${headline}</h5>
    <ul id="${headline}" class="canban list-group">
    ${str}
    </ul>
    <button type="button" class="mybtn list-group-item">Add new card</button>
</div>`
    }
    $('.list-field').html(strcol);
    drag()
}

// Add new board

const addBoard = function(key, headline) {
  key = key.replace(/ +/g, ' ').trim();
  key = key.replace(/&/g, '&amp');
  key = key.replace(/</g, '&lt');
  key = key.replace(/>/g, '&gt');
  key = key.replace(/"/g, '&quot');
  key = key.replace(/`/g, '&#x60');
  cols.set(key, []);
  render()
}

addBoard('My First Board');



$(document).on('mousedown', '.canban li', function() {
$(this).addClass("rotate");
});

$(document).on('mouseup', '.canban li', function() {
  $(this).removeClass("rotate");
  });

// Add Task

const addTask = function(key, headline) {
  key = key.replace(/ +/g, ' ').trim();
  key = key.replace(/&/g, '&amp');
  key = key.replace(/</g, '&lt');
  key = key.replace(/>/g, '&gt');
  key = key.replace(/"/g, '&quot');
  key = key.replace(/`/g, '&#x60');

  const newTask = {
    headline: key,
    description: '',
    isChecked: false,
    id: Date.now(),
  };
  cols.set(headline,[...cols.get(headline), newTask])
}

// click on Add Task
let fuck = '';

$(document).on('click', '.mybtn', function() {
  let str = '';
  arrayTask.forEach((item) => {
    str += `<li id=${item.id} class="list-group-item">${item.headline}</li>`;
  });
  $(this.previousElementSibling).append(str+`<li class="list-group-item"><input class="headline"></input></li>`);
  $('.headline').focus();
  fuck = $(this.previousElementSibling).attr('id');
});

$(document).on('blur', '.headline', function back() {
  if (this.value === '') {
    $('.headline').remove();
    render();
  } else {
    this.value = this.value.replace(/ +/g, ' ').trim();
    this.value = this.value.replace(/&/g, '&amp');
    this.value = this.value.replace(/</g, '&lt');
    this.value = this.value.replace(/>/g, '&gt');
    this.value = this.value.replace(/"/g, '&quot');
    this.value = this.value.replace(/`/g, '&#x60');
    addTask(this.value, fuck);
    $(this).replaceWith(`<span>${this.value}</span>`);
    render();
  }
});

$(document).on('keydown', '.headline', function enter(event) {
  if (event.which === 13) {
  $(this).replaceWith(`<span class="content">${this.value}</span>`);
  }
});

// Add Board

$(document).on('click', '#new-list', function() {
$(".headline-col").css("visibility", "visible");
$('.headline-col').focus();
});

$(document).on('blur', '.headline-col', function back() {
  if (this.value === '') {
    $(".headline-col").css("visibility", "hidden");
  } else {
    $(".headline-col").css("visibility", "hidden");
    addBoard(this.value);
    this.value = '';
  }
});

$(document).on('keydown', '.headline-col', function enter(event) {
  if (event.which === 13) {
    if (this.value === '') {
      $('.headline-col').focus();
  } else {
    $(".headline-col").css("visibility", "hidden");
    addBoard(this.value);
    this.value = '';
  }
  }
});

});
