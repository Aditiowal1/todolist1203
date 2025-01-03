// DOM Elements
const taskInput = document.getElementById('task-input');
const taskCategory = document.getElementById('task-category');
const taskPriority = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-container button');
const categoryFilter = document.getElementById('category-filter');
const priorityFilter = document.getElementById('priority-filter');

// Add a new task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const category = taskCategory.value;
    const priority = taskPriority.value;

    if (!taskText) {
        alert('Task cannot be empty!');
        return;
    }

    // Create task element
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.dataset.category = category;
    taskItem.dataset.priority = priority;
    taskItem.dataset.status = 'pending'; // Default status

    // Add task content
    taskItem.innerHTML = `
        <span>
            ${taskText} <em>(${category})</em> - <strong>${priority} Priority</strong>
        </span>
        <div class="task-actions">
            <input type="checkbox" class="mark-complete"> Complete
            <button class="delete-task">Delete</button>
        </div>
    `;

    // Add visual priority indicator
    taskItem.style.borderLeft = getPriorityColor(priority);

    // Append to task list
    taskList.appendChild(taskItem);

    // Clear input field
    taskInput.value = '';
});

// Get priority color
function getPriorityColor(priority) {
    switch (priority) {
        case 'High':
            return '5px solid red';
        case 'Medium':
            return '5px solid orange';
        case 'Low':
            return '5px solid green';
        default:
            return 'none';
    }
}

// Mark task as complete
taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('mark-complete')) {
        const taskItem = e.target.closest('li');
        taskItem.dataset.status = e.target.checked ? 'completed' : 'pending';
        taskItem.classList.toggle('completed', e.target.checked);
    }
});

// Delete task
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task')) {
        const taskItem = e.target.closest('li');
        taskList.removeChild(taskItem);
    }
});

// Filter tasks by status
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const tasks = Array.from(taskList.children);

        tasks.forEach(task => {
            if (filter === 'all' || task.dataset.status === filter) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    });
});

// Filter tasks by category
categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    const tasks = Array.from(taskList.children);

    tasks.forEach(task => {
        const category = task.dataset.category;
        if (selectedCategory === 'all' || category === selectedCategory) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
});

// Filter tasks by priority
priorityFilter.addEventListener('change', () => {
    const selectedPriority = priorityFilter.value;
    const tasks = Array.from(taskList.children);

    tasks.forEach(task => {
        const priority = task.dataset.priority;
        if (selectedPriority === 'all' || priority === selectedPriority) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
});
