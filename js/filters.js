class Filter {

    constructor(taskManager) {
        this.taskManager = taskManager

        document.querySelectorAll("#sidebar a").forEach(link => {
            link.addEventListener("click", event => {
                const filterName =  event.target.dataset.id
                document.querySelector("#sidebar a.active").classList.remove("active")
                event.target.classList.add("active")
                this.showTasks(filterName)
            })
        })
    }

    clearTasks() {
        const taskList = document.getElementById("tasks")
        taskList.innerHTML = ""
    }

    //creates a single <li> element
    createTaskNode(task) {
        const li = document.createElement("li")
        li.id = "task" + task.id
        li.className = "list-group-item"

        const exDiv = document.createElement("div")
        exDiv.className = "d-flex w-100 justify-content-between"
        const inDiv = document.createElement("div")
        inDiv.className = "custom-control custom-checkbox"

        const checkBox = document.createElement("input")
        checkBox.type = "checkbox"
        checkBox.id = "checkb-" + task.id
        if(task.important)
            checkBox.className = "custom-control-input important"
        else
            checkBox.className = "custom-control-input"
        inDiv.appendChild(checkBox)

        const taskDescription = document.createElement("label")
        taskDescription.className = "custom-control-label"
        taskDescription.htmlFor = checkBox.id
        taskDescription.innerText = task.description
        inDiv.appendChild(taskDescription)

        if(task.project) {
            const projectLabel = document.createElement("span")
            projectLabel.className = "project badge badge-dark ml-4"
            projectLabel.innerText = task.project
            inDiv.appendChild(projectLabel)
        }

        exDiv.appendChild(inDiv)

        if(task.deadline) {
            const taskDeadline = document.createElement("small")
            taskDeadline.className = "date"
            taskDeadline.innerText = task.deadline.format("dddd, MMMM Do YYYY, hh:mm:ss a")
            const now = moment()
            if(task.deadline.isBefore(now)) {
                taskDeadline.classList.add("bg-danger")
                taskDeadline.classList.add("text-white")
            }
            exDiv.appendChild(taskDeadline)
        }

        if(!task.privateTask){
            inDiv.insertAdjacentHTML("afterend", "<img src=\"https://image.flaticon.com/icons/svg/615/615075.svg\" width=\"20\" height=\"20\" alt=\"\">")
        }
        li.appendChild(exDiv)
        return li
    }

    //create the whole <ul> for tasks
    showTasks(filterName) {
        const taskList = document.getElementById("tasks")
        const filterTitle = document.getElementById("task-filter-head")
        this.clearTasks()
        let tasks
        switch(filterName){
            case "filter-all":
                tasks = this.taskManager.all;
                filterTitle.innerText = "All";
                break;
            case "filter-important":
                tasks = this.taskManager.important;
                filterTitle.innerText = "Important";
                break;
            case "filter-today":
                tasks = this.taskManager.today;
                filterTitle.innerText = "Today";
                break;
            case "filter-week":
                tasks = this.taskManager.nextWeek;
                filterTitle.innerText = "Next 7 Days";
                break;
            case "filter-private":
                tasks = this.taskManager.private;
                filterTitle.innerText = "Private";
                break;
            case "filter-shared":
                tasks = this.taskManager.shared;
                filterTitle.innerText = "Shared";
                break;
            default:
                filterTitle.innerText = "All";
                tasks = this.taskManager.all;
        }
        for(const t of tasks){
            const taskNode = this.createTaskNode(t)
            taskList.appendChild(taskNode)
        }
    }
}