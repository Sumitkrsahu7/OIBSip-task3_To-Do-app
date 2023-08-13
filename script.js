const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToUI(task));
}

// Save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task to UI
function addTaskToUI(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
}

// Add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToUI(taskText);
        taskInput.value = "";
        updateLocalStorage();
    }
}

// Delete task
function deleteTask(button) {
    const task = button.previousElementSibling.textContent;
    button.parentElement.remove();
    updateLocalStorage();
}

// Update local storage
function updateLocalStorage() {
    const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
    saveTasks(tasks);
}

// Load tasks on page load
loadTasks();

// Event listener for adding tasks
document.getElementById("addTask").addEventListener("click", addTask);

// Save form data to localStorage before reloading
function saveFormData() {
    localStorage.setItem("taskInputValue", taskInput.value);
}

// Load form data from localStorage on page load
function loadFormData() {
    const savedValue = localStorage.getItem("taskInputValue");
    if (savedValue) {
        taskInput.value = savedValue;
    }
}

// Call loadFormData() on page load to populate form fields
window.onload = function() {
    loadFormData();
};

// Call saveFormData() before reloading the page
function reloadPageWithFormData() {
    saveFormData();
    location.reload();
}
