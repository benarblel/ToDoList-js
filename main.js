function addTask() {
    const input = document.getElementById('new-task');
    const taskText = input.value.trim();

    const dateInput = document.getElementById('task-date');
    const taskDate = dateInput ? dateInput.value : null;

    if (taskText !== "") {
        const li = document.createElement('li');
        li.textContent = taskText;
        const taskList = document.getElementById('task-list');
        taskList.appendChild(li);

        input.value = "";
    }
}

window.onload = () => {
    const dateInput = document.getElementById('task-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }
};
