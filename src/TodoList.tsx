import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TaskList from './TaskList';
import {FilterValuesType} from './App';
import {AddItemInput} from './AddItemInput';

type TodoListPropsType = {
    todoListId: string
    title: string;
    filter: FilterValuesType
    tasks: TaskType[];
    changeFilterValue: (todoListId: string, filter: FilterValuesType) => void
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    //создаем универсальный создатель функции, который вернет функцию, в которую передаст параметр, переданный в него )))))))
    const filterHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilterValue(props.todoListId, filter)
    }
    //то же самое, но в другой записи, без ретурна и фигурных скобок
    // const filterHandlerCreator2 = (filter: FilterValuesType) => () => props.changeFilterValue(props.todoListId, filter)

    //старый вариант:
    // const setAllFilterValue = () => props.changeFilterValue(props.todoListId, 'all')
    // const setActiveFilterValue = () => props.changeFilterValue(props.todoListId, 'active')
    // const setCompletedFilterValue = () => props.changeFilterValue(props.todoListId, 'completed')

    const addTask =(title: string) => props.addTask(props.todoListId, title) //передаем функцию дальше в AddItemInput, где она получит title, затем передаст его в props.addTask вместе с props.todoListId, который пришел в todolist из App

    return (
        <div className={'todolist'}>
            <h3>
                {props.title}
                <button onClick={removeTodoListHandler}>del</button>
            </h3>
            <AddItemInput
                addItem={addTask}
                placeholder={'Enter new task title'}
            />
            <TaskList
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}/>
            <div className="filter-btn-container">
                {/*онклики в баттонах будут выполнены сразу же, после загрузки страницы, (т.к. стоит вызов функции), но вместо себя оставит колбэк функцию с переданным в нее соответствующий параметр*/}
                <button
                    className={props.filter === 'all' ? 'active-filter-btn' : 'filter-btn'}
                    onClick={filterHandlerCreator('all')}
                >All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter-btn' : 'filter-btn'}
                    onClick={filterHandlerCreator('active')}
                >Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter-btn' : 'filter-btn'}
                        onClick={filterHandlerCreator('completed')}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;





