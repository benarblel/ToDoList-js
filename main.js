function addTask() {
  const input = document.getElementById('new-task');
  const taskText = input.value.trim();
  const dateInput = document.getElementById('task-date');
  const taskDate = dateInput.value;

  if (taskText !== "" && taskDate !== "") {
    const li = document.createElement('li');
    li.dataset.date = taskDate;


    const spanText = document.createElement('span');
    spanText.textContent = taskText;

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = " ✖";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "8px";
    deleteBtn.style.color = "black";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();

      const remainingTasks = document.querySelectorAll(`#task-list li[data-date="${taskDate}"]`);
      if (remainingTasks.length === 0) {
        document.querySelectorAll("#dates-list li").forEach(dateLi => {
          if (dateLi.dataset.date === taskDate) {
            dateLi.remove();
          }
        });
      }
    });

    li.appendChild(spanText);
    li.appendChild(deleteBtn);

    const taskList = document.getElementById('task-list');
    taskList.appendChild(li);

    const formattedDate = new Date(taskDate).toLocaleDateString('fr-FR');
    const datesList = document.getElementById('dates-list');
    const existingDates = Array.from(datesList.children).map(li => li.textContent.replace(" ✖", "").trim());

    if (!existingDates.includes(formattedDate)) {
      const dateLi = document.createElement('li');
      dateLi.dataset.date = taskDate;

      const spanDate = document.createElement('span');
      spanDate.textContent = formattedDate;
      spanDate.style.cursor = "pointer";
      spanDate.addEventListener('click', () => filterTasksByDate(taskDate));

      const deleteDateBtn = document.createElement('span');
      deleteDateBtn.textContent = " ✖";
      deleteDateBtn.style.cursor = "pointer";
      deleteDateBtn.style.marginLeft = "8px";
      deleteDateBtn.style.color = "black";
      deleteDateBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dateLi.remove();

        document.querySelectorAll(`#task-list li[data-date="${taskDate}"]`).forEach(li => li.remove());
      });

      dateLi.appendChild(spanDate);
      dateLi.appendChild(deleteDateBtn);

      datesList.appendChild(dateLi);
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
};
