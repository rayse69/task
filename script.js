// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();

  if (text !== '') {
      const taskList = document.getElementById('taskList');
      const li = document.createElement('li');
      li.textContent = text;

      const startTime = Date.now(); // Record start time

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-btn');
      deleteButton.onclick = () => deleteTask(li);
      li.appendChild(deleteButton);

      const completeButton = document.createElement('button');
      completeButton.textContent = 'Complete';
      completeButton.classList.add('complete-btn');
      completeButton.onclick = () => toggleTaskCompletion(li, startTime); // Pass start time
      li.appendChild(completeButton);

      taskList.appendChild(li);
      taskInput.value = '';
  }
}

// Function to delete a task
function deleteTask(taskElement) {
  taskElement.remove();
}

// Function to mark a task as completed
function toggleTaskCompletion(taskElement, startTime) {
  taskElement.classList.toggle('completed');

  if (taskElement.classList.contains('completed')) {
      const endTime = Date.now();
      const elapsedTime = Math.floor((endTime - startTime) / 1000);
      taskElement.textContent += ` (Completed in ${elapsedTime} seconds)`;
  } else {
      taskElement.textContent = taskElement.textContent.split(' (')[0];
  }
}
