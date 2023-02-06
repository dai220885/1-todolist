import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" |"completed"

const App = () => {
    //BLL
    const todoListTitle: string ="what to learn";
    const task1: Array<TaskType> =[
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "ES6 & TS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Node.js", isDone: false},
        {id: 5, title: "Node.js2", isDone: false},
        {id: 6, title: "Node.js3", isDone: false},
    ];
    const task2: Array<TaskType> =[
        {id: 1, title: "ljlkjljklj", isDone: true},
        {id: 2, title: "ES6 & TS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "dgdgdg", isDone: false},
        {id: 5, title: "Node.js", isDone: true},
        {id: 6, title: "dggdgdg", isDone: false},
    ];
    const task3: Array<TaskType> =[];

    //деструктурируем массив(деструктуризация мессива): в первую переменную(filter) запишется нулевой элемент массива useState
    //во вторую переменную (setFilter) запишется второй элемент массива useState - функция, которая может менять первый элемент (помещенный в переменную filter)
    const[filter, setFilter] = useState<FilterValuesType>("all")
    const[tasks, setTasks]= useState<Array<TaskType>>(task2)

    const removeTask = (taskId:number)=>{
        //debugger
        const tasksAfterRemove = tasks.filter(t=>t.id!==taskId)
        setTasks(tasksAfterRemove)
    }

    const changeFilterValue = (filter:FilterValuesType) => setFilter(filter)
    let filteredTasks:Array<TaskType> = []
    //filter = "all"
    if (filter === "all"){
        filteredTasks = tasks
    }
    if(filter === "active"){
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed"){
        filteredTasks = tasks.filter(t => t.isDone === true)
    }
    //UI
    return (
        <div className="App">
            <TodoList
                title={"What to read"}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValue}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
