const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('[data-filter]');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <input type="checkbox" class="mark-complete">
            <button class="delete-task">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task')) {
        e.target.closest('li').remove();
    } else if (e.target.classList.contains('mark-complete')) {
        const li = e.target.closest('li');
        li.classList.toggle('completed');
    }
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        const tasks = taskList.children;

        Array.from(tasks).forEach(task => {
            switch (filter) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'pending':
                    task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                    break;
                case 'completed':
                    task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                    break;
            }
        });
    });
});
