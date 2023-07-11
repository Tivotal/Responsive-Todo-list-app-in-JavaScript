/* Created by Tivotal */

let textArea = document.querySelector("textarea");
let todoList = document.querySelector(".todo-list");
let num = document.querySelector(".num");
let btn = document.querySelector(".btn");

let updateUI = () => {
  //getting all tasks which has class pending
  let allTasks = document.querySelectorAll(".pending");

  //updating number of pending tasks based on all tasks length
  //if length is 0 displaying No else tasks length
  num.innerText = allTasks.length > 0 ? allTasks.length : "No";

  //getting all tasks which includes both tags with and without pending class
  let allTags = document.querySelectorAll(".item");
  //if the all tags length is greater than 0, enabling the btn
  if (allTags.length > 0) {
    btn.style.pointerEvents = "auto";
    todoList.style.marginTop = "20px";
    return;
  }
  btn.style.pointerEvents = "none";
  todoList.style.marginTop = "0";
};

textArea.addEventListener("keyup", (e) => {
  //getting text area value and trim it to remove spaces at begining and ending
  let inputVal = textArea.value.trim();

  //if enter btn clicked and text area value is not empty
  if (e.key === "Enter" && inputVal.length > 0) {
    //creating new li tag with input value
    let liTag = ` <li class="item pending" onclick="handleClick(this)">
    <input type="checkbox" />
    <span class="task">${inputVal}</span>
    <i class="trash-icon fas fa-trash" onclick="deleteTask(this)"></i>
  </li>`;

    //inserting created li tag into todo list
    todoList.insertAdjacentHTML("beforeend", liTag);

    //clearing input after li tag inserted
    textArea.value = "";

    //function to update ui
    updateUI();
  }
});

let handleClick = (item) => {
  //getting check box of this item
  let checkbox = item.querySelector("input");

  //checking or unchecking the checkbox on item click
  checkbox.checked = checkbox.checked ? false : true;

  //toggling pending class from clicked item and we consider it as completed task
  item.classList.toggle("pending");

  //updating UI
  updateUI();
};

let deleteTask = (item) => {
  //getting parent element of icon(li tag)and removing it from UI
  item.parentElement.remove();

  //updating UI
  updateUI();
};

btn.addEventListener("click", () => {
  //clearing li tags
  todoList.innerHTML = "";
  //update UI
  updateUI();
});
