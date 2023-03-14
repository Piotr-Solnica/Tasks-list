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
       const tasksList = document.querySelector(".js-tasks");

       const taskToHTML = (task) => `
            <li 
            class="js-tasks tasksList__item ${task.done && hideTasksDone ? "tasksList__item--hidden" : ""}"
            >
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
       tasksList.innerHTML = tasks.map(taskToHTML).join("");     
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if(tasks.length <= 0) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class = "buttons__button js-toggleHideTasksDone">
            ${hideTasksDone ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class = "buttons__button js-allTasksDone">
            ${tasks.every(({done}) => done) ? "disabled" : ""} Ukończ wszystkie
        </button>
        `;

     };

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


