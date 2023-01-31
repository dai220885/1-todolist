import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

const App = () => {
    const todoListTitle: string ="what to learn";
    const task1: Array<TaskType> =[
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "ES6 & TS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Node.js", isDone: false},
    ];
    const task2: Array<TaskType> =[
        {id: 1, title: "ljlkjljklj", isDone: true},
        {id: 2, title: "ES6 & TS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "dgdgdg", isDone: false},
        {id: 4, title: "Node.js", isDone: true},
        {id: 4, title: "dggdgdg", isDone: false},
    ];
    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={task1}/>
            <TodoList title={"What to read"} tasks={task2}/>
        </div>
    );
}

export default App;
