import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" |"completed"

const App = () => {
    //BLL
    const todoListTitle: string ="what to learn";//не используем
    const task1: TaskType[] =[
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Node.js", isDone: false},
        {id: v1(), title: "Node.js2", isDone: false},
        {id: v1(), title: "Node.js3", isDone: false},
    ];
    const task2: TaskType[] =[
        {id: v1(), title: "ljlkjljklj", isDone: true},
        {id: v1(), title: "ES6 & TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "dgdgdg", isDone: false},
        {id: v1(), title: "Node.js", isDone: true},
        {id: v1(), title: "dggdgdg", isDone: false},
    ];
    const task3:TaskType[] =[];

    //деструктурируем массив(деструктуризация мессива): в первую переменную(filter) запишется нулевой элемент массива useState
    //во вторую переменную (setFilter) запишется второй элемент массива useState - функция, которая может менять первый элемент (помещенный в переменную filter)
    const[filter, setFilter] = useState<FilterValuesType>("all")
    const[tasks, setTasks]= useState<TaskType[]>(task1)

    const addTask = (title: string) =>{
        const newTask:TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskId:string)=>{
        //debugger
        const tasksAfterRemove = tasks.filter(t=>t.id!==taskId)
        setTasks(tasksAfterRemove)
    }

    const changeTaskStatus =(taskId: string)=>{
        setTasks(tasks.map((t) => t.id ===taskId?  {...t, isDone: !t.isDone}: t)) //меняем в найденной по айдишнику таске значение поля isDone(также после ...t внутри {} через запятую можно перечислять те поля с новыми значениями, которые мы хотим перезаписать)
    }

    const changeTaskStatus2 =(taskId: string, newIsDone: boolean)=>{
        setTasks(tasks.map((t) => t.id ===taskId?  {...t, isDone: newIsDone}: t)) //делаем то же, что и в changeTaskStatus, только значение isDone получаем из параметра функции, которое в конечном итоге получим в компоненте taskList из e.currentTarget.checked при клике на него
    }



    const changeFilterValue = (filter:FilterValuesType) => setFilter(filter)

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType)=>{
        switch (filter){
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const filteredTasks:TaskType[] = getFilteredTasks(tasks, filter)

    //UI
    return (
        <div className="App">
            <TodoList
                title={"What to read"}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValue}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus ={changeTaskStatus2}
                filter={filter}
            />
        </div>
    );
}

export default App;
