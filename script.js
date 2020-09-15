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

  // Save All 
  let colsNow;
  const saveAll = function() {
    colsNow =new Map(JSON.parse(localStorage.getItem('save')));
    console.log("saveAll -> colsNow", colsNow)
  }

  saveAll()


  // render cols and task
  
  const render = function (popUp) {
    localStorage.setItem("save",JSON.stringify(Array.from(cols.entries())));
    if (popUp === undefined) {
      popUp = ''
    }
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
    $('.list-field').html(strcol+popUp);
    drag()
  }

  render()

  // PopUp
  const renderModal = function(item) {
    let popUp = '';
    let comments = '';
    item.comments.forEach((text) => {
      comments+=`<div class=comment-text>${text}</div>`
    })
    popUp = `<div class="popupfon">
    <div class="popup">
    <div class="popupHeader">
        <h5>${item.headline}</h5>
        <button type="button" class="btn btn-outline-danger deltask">Delete Task</button>
        </div>
        <div class="discription">
            <h6 data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Discription:</h6>
            <div id="accordion">
            <div class="card borderpopup">
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        <div class="discription-text">${item.description}</div>
                        <div class="form-group">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                          </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div class="comments">
            <h6>Comments:</h6>
            ${comments}
            <textarea class="comment-area" placeholder="Comment this"></textarea>
        </div>
    </div>
  </div>`
  render(popUp);
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
  // Add localStorage items
  
  for (let key of colsNow.keys()) {
    addBoard(key,colsNow.get(key))
  }

 // Transform task on click

  $(document).on('mousedown', '.canban li', function () {
    $(this).addClass("rotate");
    let elemLength;
    $(this.parentElement).each(function(index) {
      console.log($(this).attr('id'));
      console.log('DOM elems: ', $(this).children('ul>li').length)
      elemLength = $(this).children('ul>li').length;
    })
    console.log("In obj elems", cols.get($(this.parentElement).attr('id')).length)
    if (cols.get($(this.parentElement).attr('id')).length < elemLength) {

    } 
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

  // PopUp click
  
  let popUpName = '';
  let thisCardId = null;
  $(document).on('click', '.canban li', function() {

    $('.popupfon').show()
    $('.popup').show()


    //находим объект карточки для рендера PopUp
    cols.get($(this.parentElement).attr('id')).forEach((item) => {
      if (Number($(this).attr('id')) === item.id){
        thisCardId = Number($(this).attr('id'));
        popUpName = $(this.parentElement).attr('id');
        renderModal(item)
      }
    });
  })

  $(document).mouseup(function(e) {
    let div = $(".popup");
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) {
      $('.popupfon').hide(); 
      $('.popup').hide();
        }
  })

// PopUp Description

  $(document).on('click', '.discription-text', function() {
    $(this).replaceWith(`<textarea class="discription-area">${$(this).text()}</textarea>`)
    $('.discription-area').focus();
  })

  $(document).on('blur', '.discription-area', function() {
    $(this).replaceWith(`<div class="discription-text">${this.value}</div>`)
    cols.get(popUpName).forEach((item) =>{
      if (thisCardId === item.id){
      item.description = this.value;
      }
    })
  })

// PopUp NameChange

$(document).on('click', '.popup h5', function() {
  $(".popup h5").replaceWith(`<input class="headline-inp"></input>`)
  $('.headline-inp').val($(this).text())
  $(".headline-inp").focus()
})

$(document).on('blur', '.headline-inp', function() {
  if (this.value === '') {
    alert('Введите значение')
  } else {
  $(this).replaceWith(`<h5>${this.value}</h5>`)
  cols.get(popUpName).forEach((item) =>{
    if (thisCardId === item.id){
    item.headline = this.value;
    renderModal(item)
    }
  })
}
})

// Popup Comments

$(document).on('keydown', '.comment-area', function enter(event) {
  if (event.which === 13) {
    cols.get(popUpName).forEach((item) =>{
      if (thisCardId === item.id){
      item.comments.push(this.value);
      console.log(cols.get(popUpName))
      renderModal(item)
      $('.comment-area').focus()
      }
    })
  }
})

// PopUp Delete Task

$(document).on('click', '.deltask', function() {
  let newArr = cols.get(popUpName).filter((item) => {
    return item.id !== thisCardId;
  })
  cols.set(popUpName,newArr);
  render()
})

});