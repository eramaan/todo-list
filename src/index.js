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
const bread = new TodoItem("0", "bread", "buy the bread", "25 oct", "2", "FALSE", "1")
const homeworks = new TodoItem("1", "homeworks", "do the homeworks", "28 oct", "3", "FALSE", "2")
const dog = new TodoItem("2", "walk the dog", "walk the werewolf", "10 oct", "1", "TRUE", "1")

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



// PopulateList dovrebbe portarsi dietro l'id della lista: se vuoto o nullo li fa vedere tutti, altrimenti filtra solo perl'Id - oppure faccio una funzione diversa che viene richiamata solo dal click sulle liste che ha l'id, e l'altra funzione resta per popolare la prima pagina la prima volta



// display the lists on the menu
const projectContainer = document.getElementById("project-container");

function PopulateMenu() {

  projectContainer.innerHTML = "";

  todoListsArray.forEach((item, index) => {
    const listTitle = document.createElement('button');
    listTitle.classList.add('btn-list');   
    listTitle.textContent = `${index + 1} - ${item.title}`;
    
    projectContainer.appendChild(listTitle);
  
    });

}

PopulateMenu();

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

// accordion

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