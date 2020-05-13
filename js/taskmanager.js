class taskManager {

    constructor() {
        this.tasks = [
            new Task("Complete Lab 4", true, true, "2020-05-15T21:00:00", "Web Applications I"),
            new Task("Finish reading current book", false, true, "2020-05-30T10:00:00", "Personal"),
            new Task("Take the dog for a walk", true, false, "2020-05-13T23:59:59", "Home")
        ]
    }

    get all(){
        return this.tasks
    }

    get important(){
        return this.tasks.filter((t) => {return t.important})
    }

    get private(){
        return this.tasks.filter((t) => {return t.privateTask})
    }

    get shared(){
        return this.tasks.filter((t) => {return !t.privateTask})
    }

    get today(){
        return this.tasks.filter((t) => {
            if(t.deadline) return this.isToday(t.deadline)
            else return false
        })
    }

    get nextWeek(){
        return this.tasks.filter((t) => {
            if(t.deadline) return this.isNextWeek(t.deadline)
            else return false
        })
    }

    //returns the list of all project names
    get projects(){
        return [...new Set(this.tasks.map(t => t.project))];
    }


    isToday(date){
        return date.isSame(moment(), "day")
    }

    isNextWeek(date){
        const tomorrow = moment().add(1, "days")
        const nextWeek = moment().add(1, "weeks")
        return date.isBefore(nextWeek) && date.isAfter(tomorrow)
    }

    //returns all tasks belonging to a certain project
    getByProject(project){
        return this.tasks.filter((t) => {
            return t.project === project
        })
    }

    addTask(task){
        this.tasks.push(task)
    }
}