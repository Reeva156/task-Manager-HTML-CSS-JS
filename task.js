let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editId = null;

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  console.log("Button clicked");

  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const date = document.getElementById("date").value;
  const priority = document.getElementById("priority").value;

  if (!title || !date) {
    alert("Title and Date required");
    return;
  }

  if (editId) {
    let task = tasks.find((t) => t.id === editId);
    task.title = title;
    task.description = desc;
    task.dueDate = date;
    task.priority = priority;
    editId = null;
  } else {
    tasks.push({
      id: Date.now(),
      title,
      description: desc,
      dueDate: date,
      priority,
    });
  }

  saveData();
  clearForm();
  displayTasks();
}

function displayTasks() {
  const list = document.getElementById("taskList");
  const filter = document.getElementById("filter").value;
  const search = document.getElementById("search").value.toLowerCase();

  let data = tasks.filter((task) => {
    let priorityMatch = filter === "all" || task.priority === filter;

    let searchMatch =
      (task.title || "").toLowerCase().includes(search) ||
      (task.description || "").toLowerCase().includes(search);

    return priorityMatch && searchMatch;
  });

  list.innerHTML = data
    .map(
      (task) => `
    <div>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>${task.dueDate}</p>
      <p>${task.priority}</p>

      <button onclick="editTask(${task.id})">
        Edit
      </button>

      <button onclick="deleteTask(${task.id})">
        Delete
      </button>
    </div>
  `,
    )
    .join("");
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);

  document.getElementById("title").value = task.title;
  document.getElementById("desc").value = task.description;
  document.getElementById("date").value = task.dueDate;
  document.getElementById("priority").value = task.priority;
  editId = id;
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveData();
  displayTasks();
}
displayTasks();

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("date").value = "";
  document.getElementById("priority").value = "low";
}

clearForm();
