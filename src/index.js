import "./styles.css";


// object constructor
function TodoItem(id, title, description, dueDate, priority, done, idList) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
    this.idList = idList;
}

function TodoList(id, title) {
  this.id = id;
  this.title = title;
}


// populate some random stuff
const bread = new TodoItem("0", "bread", "buy the bread", "2024-10-08", "2", false, 1)
const homeworks = new TodoItem("1", "homeworks", "do the homeworks", "2024-10-16", "3", true, 1)
const dog = new TodoItem("2", "walk the dog", "walk the werewolf", "2024-11-30", "1", true, 0)

const work = new TodoList("0", "work hard")
const play = new TodoList("1", "play harder")

// create and populate the array of todo items
const todoItemsArray = [];
todoItemsArray.push(bread, homeworks, dog);


const todoListsArray = [];
todoListsArray.push(work, play);


// display the first page
const listContainer = document.getElementById("list-container");

function PopulateList() {

  listContainer.innerHTML = "";

  todoItemsArray.forEach((item, index) => {
    const accordionTitle = document.createElement('button');
    accordionTitle.textContent = `${index + 1} - ${item.title}, due for ${item.dueDate} | priority ${item.priority}`;
    accordionTitle.classList.add('accordion');   
    
    listContainer.appendChild(accordionTitle);
  
  
    const accordionBody = document.createElement('div');
    accordionBody.classList.add('panel');   
    accordionBody.setAttribute('id',`${item.id}`);
    accordionBody.setAttribute('querySelectorId',`item${item.id}`);   
 
  
    listContainer.appendChild(accordionBody);
  
      const panelContent = document.querySelector(`.panel[querySelectorId="item${item.id}"]`);
      const accordionP = document.createElement('p');
      accordionP.textContent = `${item.description}`;
      panelContent.appendChild(accordionP);

      const accordionBtnEdit = document.createElement('button');
      accordionBtnEdit.textContent = `edit`;
      accordionBtnEdit.classList.add('btn-edit'); 
      accordionBtnEdit.setAttribute('id',`${item.id}`);
      panelContent.appendChild(accordionBtnEdit);
      });

}

PopulateList();




// check all edit btn on menu and add the click event logic
function ClickEdit() {
  const btnsEdit = document.querySelectorAll('.btn-edit');

  btnsEdit.forEach((button) => {

    button.addEventListener('click', () => {
      const buttonId = button.id;

      openModal();
      EditModal(buttonId);
      ChangeBtnSave();
      EditOldTodo(buttonId);
    });
  });

}

ClickEdit();


const modalTitle = document.querySelector(`input#title`);
const modalDescription = document.querySelector(`input#description`);
const modalDueDate = document.querySelector(`input#dueDate`);
const modalPriority = document.querySelector(`input#priority`);
const modalDone = document.querySelector(`input#done`);

function EditModal(buttonId) {
  const item = getItemById(buttonId);

  modalTitle.value = item.title || ""; // using || "" so if the field is undefined it gets an empty value
  modalDescription.value = item.description || "";
  modalDueDate.value = item.dueDate || "";
  modalPriority.value = item.priority || "";
  modalDone.checked = item.done || false;

}

function DeleteOldTodo(buttonId) {
  const itemIndex = todoItemsArray.findIndex(item => item.id === buttonId);
  todoItemsArray.splice(itemIndex, 1);
}

// function to get item corresponding to the ID key from the button

function getItemById(buttonId) {
  return todoItemsArray.find(item => item.id === buttonId);
}


function ChangeBtnSave() {
  btnNewTodo.id = "btn-edit-old-todo";
}

function EmptyModal() {
  modalTitle.value = "";
  modalDescription.value = "";
  modalDueDate.value = "";
  modalPriority.value = "";
  modalDone.checked = false;
}

EmptyModal();



// display the lists on the menu
const projectContainer = document.getElementById("project-container");

function PopulateMenu() {

  projectContainer.innerHTML = "";

  todoListsArray.forEach((item, index) => {
    const listTitle = document.createElement('button');
    listTitle.classList.add('btn-list');   
    listTitle.textContent = `${index + 1} - ${item.title}`;
    listTitle.setAttribute('id',`${item.id}`);   

    
    projectContainer.appendChild(listTitle);
  
    });

}

// check all lists on menu and add the click event logic
function ClickMenu() {
  const btnsList = document.querySelectorAll('.btn-list');

  btnsList.forEach((button) => {

    button.addEventListener('click', () => {
      console.log(button.id);
      const buttonId = button.id;
      PopulateListFromMenu(buttonId);
    });
  });

}


function PopulateListFromMenu(buttonId) {

  listContainer.innerHTML = "";

  todoItemsArray.forEach((item, index) => {
    if (buttonId == item.idList) {
      const accordionTitle = document.createElement('button');
      accordionTitle.textContent = `${index + 1} - ${item.title}, due for ${item.dueDate} | priority ${item.priority}`;
      accordionTitle.classList.add('accordion');   
      
      listContainer.appendChild(accordionTitle);
    
    
      const accordionBody = document.createElement('div');
      accordionBody.classList.add('panel');   
      accordionBody.setAttribute('id',`${item.id}`);
      accordionBody.setAttribute('querySelectorId',`item${item.id}`);   
   
    
      listContainer.appendChild(accordionBody);
    
    
        const panelContent = document.querySelector(`.panel[querySelectorId="item${item.id}"]`);
        const accordionP = document.createElement('p');
        accordionP.textContent = `${item.description}`;
        panelContent.appendChild(accordionP);

        const accordionBtnEdit = document.createElement('button');
        accordionBtnEdit.textContent = `edit`;
        accordionBtnEdit.classList.add('btn-edit'); 
        accordionBtnEdit.setAttribute('id',`${item.id}`);  
        panelContent.appendChild(accordionBtnEdit);
    } else {
      //aggiungi cosa succede se la lista è vuota!
    }
    });

    AccordionLogic();
    ClickEdit();

}

PopulateMenu();
ClickMenu();

// create a new list
const btnNewList = document.getElementById("btn-new-list")
btnNewList.addEventListener("click", function() {
  const listTitle = document.getElementById('listTitle').value;
  const newList = new TodoList(todoListsArray.length + 1, listTitle)
  todoListsArray.push(newList);
  console.log(newList);
  PopulateMenu();
  ClickMenu();
  PopulateSelect();
}
)

// create a new todo
const btnNewTodo = document.getElementById("btn-new-todo")
btnNewTodo.addEventListener("click", function() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;
  const done = document.getElementById('done').checked;
  const idList = document.getElementById('idList').value;

  const newTodo = new TodoItem(todoItemsArray.length + 1, title, description, dueDate, priority, done, idList);
  todoItemsArray.push(newTodo);
  console.log(newTodo);
  
  modal.classList.add('hidden');
  overlay.classList.add('hidden');

  PopulateList();
  AccordionLogic();
  EmptyModal();
}
)


// edit an old todo
function EditOldTodo(buttonId) {
  const btnEditOldTodo = document.getElementById("btn-edit-old-todo")
  btnEditOldTodo.addEventListener("click", function() {
    DeleteOldTodo(buttonId);
    PopulateList();
  }
  )
}


// populate the select
function PopulateSelect() {
  const selectElement = document.getElementById('idList');
  selectElement.innerHTML = '';
  todoListsArray.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.title;
    selectElement.appendChild(option); 
  });
}

PopulateSelect();



// accordion
    function AccordionLogic() {
      let acc = document.getElementsByClassName("accordion");
      let i;
      
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          } 
        });
      }
    }

    AccordionLogic();

// modal logic

    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".btn-open");
    const closeModalBtn = document.querySelector(".btn-close");

    // close modal function
    const closeModal = function () {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
      EmptyModal();
    };

    // close the modal when the close button and overlay is clicked
    closeModalBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    EmptyModal();

    // close modal when the Esc key is pressed
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
        EmptyModal();
      }
    });

    // open modal function
    const openModal = function () {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    };
    // open modal event
    openModalBtn.addEventListener("click", openModal);
