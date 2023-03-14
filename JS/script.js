{
    let tasks = [];
    let hideTasksDone = false;
    
    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0,taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0,taskIndex),
            { 
                ...tasks[taskIndex], 
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const allTasksDone = () => {
        tasks = tasks.map((tasks) => ({
            ...tasks,
            done: true,
        }));

        render();
    }

    const toggleHideTasksDone = () => {
        hideTasksDone = !hideTasksDone;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, taskIndex) => {
            removeButtons.addEventListener("click", () => {
                removeTask(taskIndex);
            });

        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });

        });
    }
    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="js-tasks tasksList__item">
            <button class="js-done tasksList__button tasksList__button--done">
              ${task.done ? "✔" : ""}
            </button>
            <span class="tasksList__content ${task.done ? "tasksList__content--done" : ""}">
             ${task.content} 
             </span>
            <button class="js-remove tasksList__button tasksList__button--remove">
             🗑
            </button>  
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => { };

    const bindButtonsEvents = () => {};

    const render = () => {

        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents()
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        };

        newTaskElement.focus();


    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}


