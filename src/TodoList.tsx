import React from 'react';
import TaskList from "./TaskList";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    //tasks: TaskType[];//То же самое, но по-другому:
    changeFilterValue: (filter:FilterValuesType) => void
    removeTask: (taskId: number) => void
}

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <TaskList tasks={props.tasks} removeTask={props.removeTask}/>
            <div>
                <button
                    onClick={()=>props.changeFilterValue("all")}
                >All</button>
                <button
                    onClick={()=>props.changeFilterValue("active")}
                >Active</button>
                <button onClick={()=>props.changeFilterValue("completed")}
                >Completed</button>
            </div>
        </div>
    );
};

export default TodoList;





