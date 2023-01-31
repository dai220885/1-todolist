import React from 'react';
import TaskList from "./TaskList";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    //То же самое, но по-другому:
    //tasks: TaskType[];

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
            <TaskList tasks={props.tasks}/>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;





