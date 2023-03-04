import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType
}

const App = () => {
    //BLL
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Chocolate', isDone: false},
            {id: v1(), title: 'Apple', isDone: false},
            {id: v1(), title: 'Oranges', isDone: false},
        ]
    })

    // let [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListId))
        //т.к. нам не нужно отрисовывать таски удаленного тудулиста, то можем их удалить прямым воздействием на список тасок
        delete tasks[todoListId]
    }

    const addTask = (todoListId: string, title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        //раскукожили объект tasks, переписываем его поле [todoListId], в которое кладем все старые объекты, после чего добавляем новый созданный объект newTask перед остальными тасками
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const removeTask = (todoListId: string, taskId: string) => {
        //debugger
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})
    }

    const changeTaskStatus = (todoListId: string, taskId: string, newIsDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        })
        // setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone: newIsDone} : t)) //делаем то же, что и в changeTaskStatus, только значение isDone получаем из параметра функции, которое в конечном итоге получим в компоненте taskList из e.currentTarget.checked при клике на него
    }

    const changeFilterValue = (todoListId: string, newFilterValue: FilterValuesType) => {
        // setFilter(filter)
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: newFilterValue} : el))
    }

    // const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType) => {
    //     switch (filter) {
    //         case 'active':
    //             return tasks.filter(t => !t.isDone)
    //         case 'completed':
    //             return tasks.filter(t => t.isDone)
    //         default:
    //             return tasks
    //     }
    // }
    //
    // const filteredTasks: TaskType[] = getFilteredTasks(tasks, filter)

    //UI
    return (
        <div className="App">
            {todoLists.map(el => {
                    let tasksForTodoList = tasks[el.id];
                    if (el.filter === 'active') {
                        tasksForTodoList = tasks[el.id].filter(t => !t.isDone)
                    }
                    if (el.filter === 'completed') {
                        tasksForTodoList = tasks[el.id].filter(t => t.isDone)
                    }
                    return <TodoList
                        key = {el.id}
                        todoListId={el.id}
                        title={el.title}
                        tasks={tasksForTodoList}
                        changeFilterValue={changeFilterValue}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                    />


                }
            )
            }


        </div>
    );
}

export default App;
