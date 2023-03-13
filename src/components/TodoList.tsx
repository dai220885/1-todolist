import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TaskList from './TaskList';
import {FilterValuesType} from '../App';
import {AddItemInput} from './AddItemInput';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

type TodoListPropsType = {
    todoListId: string
    title: string;
    filter: FilterValuesType
    tasks: TaskType[];
    changeFilterValue: (todoListId: string, filter: FilterValuesType) => void
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
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

    //создаем универсальный создатель функции, который вернет функцию, в которую передаст параметр, переданный в него ))))))) Делаем так из-за того, что в button onClick мы сразу запускаем filterHandlerCreator() и передаем в нее параметр, поэтому filterHandlerCreator должна вернуть функцию, которая, в свою очередь, будет запущена после события onClick. Можно было написать в баттоне: onClick={()=>filterHandlerCreator('значение фильтра')}, тогда в определении filterHandlerCreator не нужно было возвращать функцию, а просто  props.changeFilterValue(props.todoListId, filter)
    const filterHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilterValue(props.todoListId, filter)
    }

    //то же самое, но в другой записи, без ретурна и фигурных скобок
    // const filterHandlerCreator2 = (filter: FilterValuesType) => () => props.changeFilterValue(props.todoListId, filter)

    //старый вариант:
    // const setAllFilterValue = () => props.changeFilterValue(props.todoListId, 'all')
    // const setActiveFilterValue = () => props.changeFilterValue(props.todoListId, 'active')
    // const setCompletedFilterValue = () => props.changeFilterValue(props.todoListId, 'completed')

    const addTask = (title: string) => props.addTask(props.todoListId, title) //передаем функцию дальше в AddItemInput, где она получит title, затем передаст его в props.addTask вместе с props.todoListId, который пришел в todolist из App

    const changeTodoListTitleHandler = (newTitle: string) =>{
        props.changeTodoListTitle(props.todoListId, newTitle)
    }
    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan
                    title={props.title}
                    onChange={changeTodoListTitleHandler}
                />
                {/*<button onClick={removeTodoListHandler}>del</button>*/}
                {/*кнопка из material.ui:*/}
                <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemInput
                addItem={addTask}
                placeholder={'Enter new task title'}
            />
            <TaskList
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />
            <div className="filter-btn-container">
                {/*онклики в баттонах будут выполнены сразу же, после загрузки страницы, (т.к. стоит вызов функции), но вместо себя оставит колбэк функцию с переданным в нее соответствующий параметр*/}
                <Button
                    color ={'inherit'}
                    // className={props.filter === 'all' ? 'active-filter-btn' : 'filter-btn'}
                    variant ={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={filterHandlerCreator('all')}
                >All
                </Button>
                <Button
                    color={'primary'}
                    // className={props.filter === 'active' ? 'active-filter-btn' : 'filter-btn'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={filterHandlerCreator('active')}
                >Active
                </Button>
                <Button
                    color = {'secondary'}
                    //className={props.filter === 'completed' ? 'active-filter-btn' : 'filter-btn'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={filterHandlerCreator('completed')}
                >Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;





