$(document).ready(() => {

  let arrayTask = [];
  let cols = new Map();

  // Drag N Drop
  const drag = function () {
    $(function () {
      $('.canban ').sortable({
        connectWith: ".canban"
      }).disableSelection();
    });
  }

  // render cols and task
  
  const render = function () {
    let strcol = ``;
    for (let headline of cols.keys()) {
      let str = '';
      cols.get(headline).forEach((item) => {
        str += `<li id=${item.id} class="list-group-item" data-toggle="modal" data-target="#exampleModalCenter">${item.headline}</li>`;
      })
      strcol += `<div class="box">
    <div class="card-opt">
                    <h5 class="title-card">${headline}</h5>
                    <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu">
                        <a id="${headline}" class="dropdown-item del-cards" href="#">Delete all cards</a>
                        <a id="${headline}" class="dropdown-item del-column" href="#">Delete column</a>
                        <div class="dropdown-divider"></div>
                        <a id="${headline}" class="dropdown-item copy-cards" href="#">Copy all cards</a>
                    </div>
                </div>
    <ul id="${headline}" class="canban list-group">
    ${str}
    </ul>
    <button type="button" class="mybtn list-group-item">Add new card</button>
</div>`
    }
    $('.list-field').html(strcol);
    drag()
  }

  // Render Modal
  const renderModal = function() {

  }

  // Add new board

  const addBoard = function (key, array) {
    key = key.replace(/ +/g, ' ').trim();
    key = key.replace(/&/g, '&amp');
    key = key.replace(/</g, '&lt');
    key = key.replace(/>/g, '&gt');
    key = key.replace(/"/g, '&quot');
    key = key.replace(/`/g, '&#x60');
    if (array === undefined){
      array = [];
    }
    cols.set(key, array);
    render()
  }

  addBoard('My First Board');

 // Transform task on click

  $(document).on('mousedown', '.canban li', function () {
    $(this).addClass("rotate");
  });

  $(document).on('mouseup', function () {
    $('.canban li').removeClass("rotate");
  });

  // Add Task

  const addTask = function (key, headline) {
    key = key.replace(/ +/g, ' ').trim();
    key = key.replace(/&/g, '&amp');
    key = key.replace(/</g, '&lt');
    key = key.replace(/>/g, '&gt');
    key = key.replace(/"/g, '&quot');
    key = key.replace(/`/g, '&#x60');

    const newTask = {
      headline: key,
      description: '...',
      comments: [],
      isChecked: false,
      id: Date.now(),
    };
    cols.set(headline, [...cols.get(headline), newTask])
  }

  // click on Add Task
  let fuck = '';

  $(document).on('click', '.mybtn', function () {
    let str = '';
    arrayTask.forEach((item) => {
      str += `<li id=${item.id} class="list-group-item">${item.headline}</li>`;
    });
    $(this.previousElementSibling).append(str + `<li class="list-group-item"><input class="headline"></input></li>`);
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

  $(document).on('click', '#new-list', function () {
    $(".headline-col").css("visibility", "visible");
    $('.headline-col').focus();
  });

  $(document).on('blur', '.headline-col', function back() {
    if (this.value === '') {
      $(".headline-col").css("visibility", "hidden");
    } else {
      $(".headline-col").css("visibility", "hidden");
      addBoard(this.value, copyItems);
      copyItems = [];
      this.value = '';
    }
  });

  $(document).on('keydown', '.headline-col', function enter(event) {
    if (event.which === 13) {
      if (this.value === '') {
        $('.headline-col').focus();
      } else {
        $(".headline-col").css("visibility", "hidden");
        addBoard(this.value, copyItems);
        this.value = '';
        copyItems = []
      }
    }
  });

  // Delete All Cards

  $(document).on('click', '.del-cards', function () {
    cols.set($(this).attr('id'), []);
    render()
  });

  // Delete Column

  $(document).on('click', '.del-column', function () {
    cols.delete($(this).attr('id'));
    render()
  });

  // Copy All Cards
 let copyItems = [];
  $(document).on('click', '.copy-cards', function () {
    $(".headline-col").css("visibility", "visible");
    $('.headline-col').focus();
    copyItems = cols.get($(this).attr('id'));
  });

  // Modal window
  

  $(document).on('click', '.canban li', function() {
    // console.log($(this).attr('id'))
    // console.log($(this.parentElement).attr('id'))
    // console.log(cols.get($(this.parentElement).attr('id')))
    cols.get($(this.parentElement).attr('id')).forEach((item) => {
      if (Number($(this).attr('id')) === item.id){
        
      }
    });
    
  })

});