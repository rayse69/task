// Function to retrieve tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks on the page
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = getTasks();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-btn');
        completeButton.onclick = () => toggleTaskCompletion(task.id);
        li.appendChild(completeButton);

        if (task.completed) {
            li.classList.add('completed');
            completeButton.disabled = true;
        }

        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text !== '') {
        const tasks = getTasks();
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false,
            startTime: Date.now() // Record start time
        };
        tasks.push(newTask);
        saveTasks(tasks);
        renderTasks();
        taskInput.value = '';
    }
}

// Function to toggle task completion status
function toggleTaskCompletion(id) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        const task = tasks[taskIndex];
        task.completed = true;
        saveTasks(tasks);
        renderTasks();
    }
}

// Render tasks when the page loads
window.onload = renderTasks;
