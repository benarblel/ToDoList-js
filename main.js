function addTask() {
  const input = document.getElementById('new-task');
  const taskText = input.value.trim();

  if (taskText !== "") {
    const li = document.createElement('li');
    li.textContent = taskText;
    document.body.appendChild(li);
    input.value = "";
  }
}