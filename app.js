// Select DOM elements
const taskInput = document.getElementById('task-input');
const taskCategory = document.getElementById('task-category');
const taskPriority = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const priorityFilter = document.getElementById('priority-filter');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');

// Add a new task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const category = taskCategory.value;
    const priority = taskPriority.value;

    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText} (${category}) - <strong>${priority} Priority</strong></span>
        <div>
            <input type="checkbox" class="mark-complete">
            <button class="delete-task">Delete</button>
        </div>
    `;
    li.dataset.category = category; // Store category in data attribute
    li.dataset.status = 'pending'; // Default status is pending
    li.dataset.priority = priority; // Store priority in data attribute
    li.style.borderLeft = getPriorityColor(priority); // Add visual indicator
    taskList.appendChild(li);

    taskInput.value = ''; // Clear input field
});

// Get color for priority
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

// Mark a task as complete
taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('mark-complete')) {
        const listItem = e.target.closest('li');
        listItem.dataset.status = e.target.checked ? 'completed' : 'pending';
        listItem.classList.toggle('completed', e.target.checked);
    }
});

// Delete a task
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task')) {
        const listItem = e.target.closest('li');
        taskList.removeChild(listItem);
    }
});

// Filter tasks by category
categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    const tasks = taskList.children;

    Array.from(tasks).forEach(task => {
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
    const tasks = taskList.children;

    Array.from(tasks).forEach(task => {
        const priority = task.dataset.priority;
        if (selectedPriority === 'all' || priority === selectedPriority) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
});

// Search tasks
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const tasks = taskList.children;

    Array.from(tasks).forEach(task => {
        const taskText = task.querySelector('span').innerText.toLowerCase();
        task.style.display = taskText.includes(searchText) ? 'flex' : 'none';
    });
});
