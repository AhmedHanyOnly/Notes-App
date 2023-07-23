let text = document.querySelector(".text");
let sub = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let ArrText = [];

if (window.localStorage.getItem("task")) {
  ArrText = JSON.parse(window.localStorage.getItem("task"));
}

GetLocal();

sub.onclick = function () {
  if (text.value !== "") {
    TaskInput();
    text.value = "";
  }
};

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    DelLocal(e.target.parentElement.getAttribute("data-set"));

    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
  }
});

function TaskInput() {
  const task = {
    id: Date.now(),
    title: text.value,
  };
  ArrText.push(task);
  // console.log(ArrText)
  AddToPage(ArrText);
  AddToLocal(ArrText);
}

function AddToPage(ArrText) {
  tasks.innerHTML = "";
  ArrText.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-set", task.id);
    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    // console.log(div)
    tasks.appendChild(div);
  });
}

function AddToLocal(ArrText) {
  window.localStorage.setItem("task", JSON.stringify(ArrText));
}

function GetLocal() {
  let data = window.localStorage.getItem("task");
  if (data) {
    let task = JSON.parse(data);
    AddToPage(task);
  }
}

function DelLocal(taskid) {
  ArrText = ArrText.filter((task) => task.id != taskid);
  AddToLocal(ArrText);
}

let date = new Date();
console.log(date);
