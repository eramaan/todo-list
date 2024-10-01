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

// populate some random stuff
const bread = new TodoItem("0", "bread", "buy the bread", "25 oct", "2", "FALSE", "1")
const homeworks = new TodoItem("1", "homeworks", "do the homeworks", "28 oct", "3", "FALSE", "2")
const dog = new TodoItem("2", "walk the dog", "walk the werewolf", "10 oct", "1", "TRUE", "1")

console.log(bread);
console.log(homeworks);
console.log(dog);

// create and populate the array of todo items
const todoItemsArray = [];

todoItemsArray.push(bread, homeworks, dog);

//test on the console
todoItemsArray.forEach((item, index) => {
    const itemInfo = `Item ${index + 1}: Title = ${item.title}, id = ${item.id}`;
console.log(itemInfo);
  });

// display the first page
const listContainer = document.getElementById("list-container");

todoItemsArray.forEach((item, index) => {
    const itemInfo = document.createElement('p');
    itemInfo.textContent = `${index + 1} - ${item.title}, due for the ${item.dueDate} | priority ${item.priority}`;
    listContainer.appendChild(itemInfo);

console.log(itemInfo);
  });