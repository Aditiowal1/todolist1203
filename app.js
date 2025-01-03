const taskInput = document.getElementById('task-input');
const taskCategory = document.getElementById('task-category');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('[data-filter]');
const categoryFilter = document.getElementById('category-filter');

// Add a new task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const category = taskCategory.value;

    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText} (${category})</span>
        <div>
            <input type="checkbox" class="mark-complete">
            <button class="delete-task">Delete</button>
        </div>
    `;
    li.dataset.category = category; // Store the category as a data attribute
    li.dataset.status = 'pending'; // Set the initial status to "pending"
    taskList.appendChild(li);

    taskInput.value = '';
});

// Delete and mark as complete
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task')) {
        e.target.closest('li').remove();
    } else if (e.target.classList.contains('mark-complete')) {
        const li = e.target.closest('li');
        li.classList.toggle('completed');
        li.dataset.status = li.classList.contains('completed') ? 'completed' : 'pending';
    }
});

// Filter by status (all, pending, completed)
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        const tasks = taskList.children;

        Array.from(tasks).forEach(task => {
            const status = task.dataset.status;
            if (filter === 'all' || filter === status) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    });
});

// Filter by category
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
