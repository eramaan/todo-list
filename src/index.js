import "./styles.css";

// remember, if you need to use an image in a js file, you need to import it:
// import odinImage from "./odin.png";
// const image = document.createElement("img");
// image.src = odinImage;






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
const bread = new TodoItem("0", "bread", "buy the bread", "25 oct", "2", "FALSE", "0")
const homeworks = new TodoItem("1", "homeworks", "do the homeworks", "28 oct", "3", "FALSE", "1")
const dog = new TodoItem("2", "walk the dog", "walk the werewolf", "10 oct", "1", "TRUE", "0")

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
    accordionTitle.textContent = `${index + 1} - ${item.title}, due for the ${item.dueDate} | priority ${item.priority}`;
    accordionTitle.classList.add('accordion');   
    
    listContainer.appendChild(accordionTitle);
  
  
    const accordionBody = document.createElement('div');
    accordionBody.classList.add('panel');   
    accordionBody.setAttribute('id',`${item.id}`);   
  
    listContainer.appendChild(accordionBody);
  
  
      const panelContent = document.getElementById(`${item.id}`);
      const accordionP = document.createElement('p');
      accordionP.textContent = `${item.description}`;
      panelContent.appendChild(accordionP);
  
    });

}

PopulateList();



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
    if (buttonId === item.idList) {
      const accordionTitle = document.createElement('button');
      accordionTitle.textContent = `${index + 1} - ${item.title}, due for the ${item.dueDate} | priority ${item.priority}`;
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
    }  
    });

    AccordionLogic();

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
}
)

// create a new todo
const btnNewTodo = document.getElementById("btn-new-todo")
btnNewTodo.addEventListener("click", function() {
  const newTodo = new TodoItem(todoItemsArray.length + 1, listTitle)
  todoItemsArray.push(newTodo);
  console.log(newTodo);
  PopulateList();

//sono arrivato qua, tocca fare il todo e salvare le info, con una modalità che riprendi per la modifica?

}
)

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