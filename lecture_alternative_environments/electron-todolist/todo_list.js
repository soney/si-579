const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
// get the offset of the current timezone (in milliseconds)

addTask("Buy milk", 1614038400000);
addTask("Set clock forward for DST", 1615705200000);

function addTask(description, dueTime) {
   const taskList = document.getElementById("task_list");

   const dueTimeNode = document.createElement("span");
   dueTimeNode.setAttribute("class", "due")
   dueTimeNode.textContent = new Date(dueTime);

   const newTask = document.createElement("li");
   newTask.append(description, dueTimeNode)
   taskList.append(newTask);
}

const addTaskButton = document.getElementById("add_task");

addTaskButton.addEventListener("click", () => {
    const descriptionInput = document.getElementById("task_description_input");
    const dueDateInput     = document.getElementById("duedate_input");
    const dueTimeInput     = document.getElementById("duetime_input");

    const description = descriptionInput.value;
    const dueDate = dueDateInput.valueAsNumber;
    const dueTime = dueTimeInput.valueAsNumber;
    const fullDueDate = dueDate + dueTime + timezoneOffset;

    addTask(description, fullDueDate);

    descriptionInput.value = '';
});