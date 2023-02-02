{
    const tasks = [
        {
            content: "umyć samochód",
            done: true,
        },
        {
            content: "iść na trening",
            done: false,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li>
                   ${task.content}
                </li>
            `;
        };

     document.querySelector(".js-tasks").innerHTML = htmlString;

    }

    init = () => {
        render();
    };
    
    init();
}


