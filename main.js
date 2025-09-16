function addTask() {
  const input = document.getElementById('new-task');
  const taskText = input.value.trim();
  const dateInput = document.getElementById('task-date');
  const taskDate = dateInput.value;

  if (taskText !== "" && taskDate !== "") {
    const li = document.createElement('li');
    li.textContent = taskText;
    li.dataset.date = taskDate;

    const taskList = document.getElementById('task-list');
    taskList.appendChild(li);

    const formattedDate = new Date(taskDate).toLocaleDateString('fr-FR');
    const datesList = document.getElementById('dates-list');
    const existingDates = Array.from(datesList.children).map(li => li.textContent);

    if (!existingDates.includes(formattedDate)) {
      const dateLi = document.createElement('li');
      dateLi.textContent = formattedDate;
      datesList.appendChild(dateLi);
      dateLi.addEventListener('click', () => filterTasksByDate(taskDate));
    }

    filterTasksByDate(taskDate);  

    input.value = "";
  }
}

function filterTasksByDate(date) {
  const taskList = document.getElementById('task-list');
  const tasks = taskList.querySelectorAll('li');

  tasks.forEach(li => {
    li.style.display = li.dataset.date === date ? 'list-item' : 'none';
  });
}

window.onload = () => {
  const dateInput = document.getElementById('task-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  const today = new Date().toISOString().split('T')[0];
  filterTasksByDate(today);

  const datesList = document.getElementById('dates-list');
  datesList.querySelectorAll('li').forEach(li => {
    const parts = li.textContent.split('/');
    const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    li.addEventListener('click', () => filterTasksByDate(isoDate));
  });
};
