import React, {ChangeEvent, FC} from 'react';
import {TaskType} from './TodoList';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (todoListId: string, taskId: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task) => {
                const taskClasses = ['task']
                task.isDone && taskClasses.push('task-done')
                const removeTaskHandler = () => props.removeTask(props.todoListId, task.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked)
                const changeTaskTitleHandler = (newTitle: string) => {
                    props.changeTaskTitle(props.todoListId, task.id, newTitle)
                }
                return (
                    <div key={task.id}>{/*key нужен для того, чтобы при изменении списка (перерендеринг) React понимал, какой элемент из списка добавился, а какой уже был ранее*/}
                        {/*старый вариант с инпутом:*/}
                        {/*<input*/}
                        {/*    type="checkbox"*/}
                        {/*    checked={task.isDone}*/}
                        {/*    onChange={changeTaskStatusHandler}*/}
                        {/*/>*/}
                        <Checkbox
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />


                        {/*добавим спану классНейм, который будет состоять из task  и (в случае отмеченной галочки) task-done*/}
                        {/*<span className={`task ${task.isDone? "task-done": ''}`}>{task.title}</span>*/}

                        {/*делаем то же самое, но используем значения, положенные в массив taskClasses, который объявили в мэпе*/}
                        {/*<span className={taskClasses.join(" ")}>{task.title}</span>*/}
                        <EditableSpan
                            className={taskClasses.join(' ')}
                            title={task.title}
                            onChange={changeTaskTitleHandler}
                        />
                        {/*<button onClick={removeTaskHandler}>x</button>*/}
                        {/*кнопка из material.ui:*/}
                        <IconButton aria-label="delete" onClick={removeTaskHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                )
            })
            : <span>Your taskslist is empty</span>
    return (
        <ul>
            {tasksItems}
        </ul>
    );
};

export default TasksList;