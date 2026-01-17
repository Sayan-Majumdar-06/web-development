document.addEventListener("DOMContentLoaded", () => {
    const addTaskInput = document.querySelector(".task-add-input");
    const addTaskBtn = document.querySelector(".add-task-btn");

    const taskList = document.querySelector(".task-list");
    const toDoList = document.querySelector(".todo-list");

    document.addEventListener('click', (e) => {
        if(e.target.className.split(' ')[0] == 'add-task-btn'){
            toDoList.style.display = "block";
            addTask();
        }

        else if(e.target.className.split(' ')[0] == 'task-check'){
            e.target.classList.toggle("completed");
            
            if(e.target.classList.contains("completed")) {
                e.target.nextElementSibling.style.textDecoration = "line-through";
            } else {
                e.target.nextElementSibling.style.textDecoration = "none";
            }
        } 
        
        else if(e.target.className.split(' ')[0] == "delete-btn") {
            const item = e.target.parentElement;
            taskList.removeChild(item);

            if(taskList.innerHTML == "") {
                toDoList.style.display = "none";
            }
        }
    })

    document.addEventListener('keydown', (e) => {
        if(e.key == "Enter") {
            toDoList.style.display = "block";
            addTask();
        }
    });

    function addTask() {
        let task = "";
        if(addTaskInput.value != "") {
            task = addTaskInput.value;

            taskList.insertAdjacentHTML("beforeend",`<li> <div class="task-text"><input type="checkbox" class="task-check" for="task"><p>${task}</p></div> <img class="delete-btn" src="./assets/delete_icon.svg" alt="delete"/> </li>`);
            addTaskInput.value = "";
        } else {
            alert("Can't add an empty task !");
        }
    }    
})