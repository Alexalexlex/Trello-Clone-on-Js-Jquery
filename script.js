$(document).ready(() => {

$('.list-field').html(`<div class="box">
<h5>My first board</h5>
<ul class="canban list-group">
</ul>
<button type="button" class="mybtn list-group-item">Add new card</button>
</div>`)

const arrayTask = [];
const cols = new Map ();

// render cols
const render = function() {
  str = ``;
  for(let headline of cols.keys()){
    str+= `<div class="box">
    <h5>${headline}</h5>
    <ul class="canban list-group">
    </ul>
    <button type="button" class="mybtn list-group-item">Add new card</button>
</div>`
    }
    $('.list-field').html(str);
    console.log(cols);
}

// render task !!!!

// Drag N Drop

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

// Add Task in Board

$(document).on('click', '.mybtn', function() {
  let str = '';
  arrayTask.forEach((item) => {
    str += `<li id=${item.id} class="list-group-item">${item.headline}</li>`;
  });
  $(this.previousElementSibling).html(str+`<li class="list-group-item"><input class="headline"></input></li>`);
  $('.headline').focus();
});

$(document).on('blur', '.headline', function back() {
  $(this).replaceWith(`<span>${this.value}</span>`);
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

// Add Board

$(document).on('click', '#new-list', function() {
//   $('.list-field').html(`<div class="box">
//   <input class=""headline></input>
// </div>`)
// $('.headline').focus();

$('.list-field').html(`<div class="box">
<input class="headline-col" >
<ul class="canban list-group">
</ul>
<button type="button" class="mybtn list-group-item">Add new card</button>
</div>`)
});

$(document).on('blur', '.headline-col', function back() {
  $(this).replaceWith(`<h5>${this.value}</h5>`);
  cols.set(this.value, []);
  render()
});

});
