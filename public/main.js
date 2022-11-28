let uName = document.getElementById("uName");
let nameBtn = document
  .getElementById("nameBtn")
  .addEventListener("click", userName);
let welcome = document.getElementById("welcome");
let taskInput = document.getElementById("taskInput");
let addTask = document
  .getElementById("addTask")
  .addEventListener("click", uploadTask);
let taskInfo = document.getElementById("taskInfo");
let completeTask = document.getElementById("completeTask");
let deleteTask = document.getElementById("deleteTask");
let inProgress = document.getElementById("inProgress");
let completed = document.getElementById("completed");
let modal = document.getElementById("modal");

// Date Function
var today = new Date();
var date =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes();
var dateTime = `${time}, ${date}`;
console.log(dateTime);

// Modal Control Functions
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", clickOutside);

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}
function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

function userName(e) {
  e.preventDefault();
  let user = uName.value;

  var usersName = {
    // id: Math.floor(Math.random() * 100000),
    names: user,
  };

  localStorage.removeItem("names");

  if (localStorage.getItem("names") === null) {
    var names = [];
    names.push(user);
    localStorage.setItem("names", JSON.stringify(names));
  } else {
    var names = JSON.parse(localStorage.getItem("names"));
    names.push(user);
    localStorage.setItem("names", JSON.stringify(names));
  }

  welcome.innerHTML = `Welcome, <span class="text-lightBlue">${names}</span> `;
  if (!user) {
    alert("Please fill in the form");
    return false;
  }
  modal.style.display = "none";

  console.log(user);
}

// Display username on load
function fetchUname() {
  let user = uName.value;
  var names = JSON.parse(localStorage.getItem("names"));
  // var usersName

  if (localStorage.getItem("names") === null) {
    welcome.innerHTML = `Welcome! <i class="text-sm">Click here to add name</i>`;
  } else {
    welcome.innerHTML = `Welcome, <span class="text-lightBlue ">${names}</span> `;
  }
}

function uploadTask(e) {
  e.preventDefault();
  let tInput = taskInput.value;

  if (!tInput) {
    alert("Please enter a task!");
    return false;
  }

  var ongoingTask = {
    id: Math.floor(Math.random() * 100000),
    taskValue: tInput,
    DateTime: dateTime,
  };

  if (localStorage.getItem("ongoingTasks") === null) {
    var ongoingTasks = [];
    ongoingTasks.push(ongoingTask);
    localStorage.setItem("ongoingTasks", JSON.stringify(ongoingTasks));
  } else {
    var ongoingTasks = JSON.parse(localStorage.getItem("ongoingTasks"));
    ongoingTasks.push(ongoingTask);
    localStorage.setItem("ongoingTasks", JSON.stringify(ongoingTasks));
  }

  fetchOngoingTasks();
}

function fetchOngoingTasks() {
  var ongoingTasks = JSON.parse(localStorage.getItem("ongoingTasks"));

  inProgress.innerHTML = ` <h3
  class="border-l-4 p-0.5 mb-3 border-l-maroon px-2 rounded-sm bg-red-200"
>
  Ongoing
</h3>`;

  for (var i = ongoingTasks.length - 1; i >= 0; i--) {
    var taskValue = ongoingTasks[i].taskValue;
    var id = ongoingTasks[i].id;
    var date = ongoingTasks[i].DateTime;

    inProgress.innerHTML += `
    <div
    class=" bg-almostWhite mb-1 border-b-2 border-l border-l-maroon border-b-maroon border-t border-t-maroon border-r-2 border-r-maroon flex justify-between py-3 pl-3 pr-2 rounded-tl-xl rounded-br-xl rounded-md shadow-sm shadow-maroon"
  >
    <p id="taskInfo">${taskValue}</p>
    <div class="">
      <a
        href="#" onclick="markComplete(${id})"
        id="completeTask"
        class="anim-red bg-green-800 py-1.5 px-2.5 rounded-md text-white font-extrabold hover:text-green-800 hover:outline hover:outline-1 hover:bg-almostWhite hover:outline-green-800"
        >&check;</a
      >
      <a
        href="#"
        id="deleteTask" onclick="deleteOngoingTask(${id})"
        class="anim-red bg-red-800 py-1.5 px-2.5 rounded-md text-white text-1xl font-extrabold hover:text-red-800 hover:outline hover:outline-1 hover:bg-almostWhite hover:outline-red-800"
        >&times;</a
      >
    </div>
  </div>
  <p id="date" class="text-sm text-right mb-3"><i>Added: ${date}</i></p>
    `;
  }
}

function deleteOngoingTask(id) {
  var ongoingTasks = JSON.parse(localStorage.getItem("ongoingTasks"));
  for (var i = 0; i < ongoingTasks.length; i++) {
    if (ongoingTasks[i].id == id) {
      // remove from array
      ongoingTasks.splice(i, 1);
    }
  }
  localStorage.setItem("ongoingTasks", JSON.stringify(ongoingTasks));

  fetchOngoingTasks();
}
let tInput = taskInput.value;
// var completedTask = {
//   id: Math.floor(Math.random() * 100000),
//   taskValue: tInput,
//   DateTime: dateTime,
// };

function markComplete(id) {
  var ongoingTasks = JSON.parse(localStorage.getItem("ongoingTasks"));
  // console.log(id);
  for (var i = 0; i < ongoingTasks.length; i++) {
    if (ongoingTasks[i].id == id) {
      // console.log(ongoingTasks[i].id);
      var completedTask = {
        id: ongoingTasks[i].id,
        taskValue: ongoingTasks[i].taskValue,
        DateTime: dateTime,
      };
      

      if (localStorage.getItem("completedTasks") === null) {
        var completedTasks = [];
        completedTasks.push(completedTask);
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
      } else {
        var completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
        completedTasks.push(completedTask);
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
      }
      fetchCompletedTasks();
      ongoingTasks.splice(i, 1);
    }
  }
}

function fetchCompletedTasks() {
  var completedTasks = JSON.parse(localStorage.getItem("completedTasks"));

  completed.innerHTML = ` <h3
  class="border-l-4 p-0.5 mb-3 border-l-lightBlue px-2 rounded-sm bg-blue-200"
>
  Completed
</h3>`;

  for (var i = completedTasks.length - 1; i >= 0; i--) {
    var taskValue = completedTasks[i].taskValue;
    var id = completedTasks[i].id;
    var date = completedTasks[i].DateTime;

    completed.innerHTML += `
    <div
    class="bg-almostWhite mb-1 border-b-2 border-l border-l-lightBlue border-b-lightBlue border-t border-t-lightBlue border-r-2 border-r-lightBlue flex justify-between py-3 pl-3 pr-2 rounded-tl-xl rounded-br-xl rounded-md shadow-sm shadow-lightBlue"
  >
    <p id="taskInfo">${taskValue}</p>
    <div class="">
      <a
        href="#"
        id="deleteTask" onclick="deleteCompletedTask(${id})"
        class="anim-red bg-red-800 py-1.5 px-2.5 rounded-md text-white text-1xl font-extrabold hover:text-red-800 hover:outline hover:outline-1 hover:bg-almostWhite hover:outline-red-800"
        >&times;</a
      >
    </div>
  </div>
  <p id="date" class="text-sm text-right mb-3"><i>Completed: ${date}</i></p>
    `;
  }
}

function deleteCompletedTask(id) {
  var completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
  for (var i = 0; i < completedTasks.length; i++) {
    if (completedTasks[i].id == id) {
      // remove from array
      completedTasks.splice(i, 1);
    }
  }
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

  fetchCompletedTasks();
}