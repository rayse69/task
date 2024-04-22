document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    addButton.addEventListener('click', function() {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
      }
    });
  
    taskList.addEventListener('click', function(event) {
      if (event.target.classList.contains('complete-button')) {
        const taskItem = event.target.parentNode;
        const timeDiff = calculateTimeDifference(taskItem.dataset.startTime);
        taskItem.textContent += ` - Completed in ${timeDiff}`;
        setTimeout(() => {
          taskItem.remove();
        }, 10000); // Remove the task after 3 seconds
      }
    });
  
    function addTask(taskText) {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.dataset.startTime = new Date().getTime();
      li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="complete-button">Complete</button>
      `;
      taskList.appendChild(li);
    }
  
    function calculateTimeDifference(startTime) {
      const endTime = new Date().getTime();
      const timeDiff = endTime - startTime;
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
      let timeString = '';
      if (hours > 0) {
        timeString += `${hours} hour(s) `;
      }
      if (minutes > 0) {
        timeString += `${minutes} minute(s) `;
      }
      if (seconds > 0) {
        timeString += `${seconds} second(s)`;
      }
      return timeString;
    }
  });
  