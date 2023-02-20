import React, {ChangeEvent, RefObject, useRef, useState, KeyboardEvent} from 'react';
import TaskList from './TaskList';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    title: string;
    filter: FilterValuesType
    //tasks: Array<TaskType>;//То же самое, но по-другому
    tasks: TaskType[];
    changeFilterValue: (filter: FilterValuesType) => void
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {
    // const addTaskInput:RefObject<HTMLInputElement> = useRef(null)
    //
    // const addTask = () =>{
    //     if(addTaskInput.current) {
    //     props.addTask(addTaskInput.current.value)
    //         addTaskInput.current.value=''
    //     }
    // }
    // const addTask = () =>{
    //     addTaskInput.current&&props.addTask(addTaskInput.current.value)
    // }
    const [title, setTitle] = useState<string>('')//локальный стейт для хранения значения, введенного в инпуте
    const [error, setError] = useState<boolean>(false)//локальный стейт для хранения значения, есть ли ошибка ввода(пока только ошибка пустой строки, ошибка превышения лимита введенных символов тут не обрабатывается)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false) //снимаем ошибку, если начали печатать
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (isUserMessageValid) {props.addTask(trimmedTitle); setTitle('')}//если введен текст не длиннее 15 символов и не короче одного, то добавляем таску и обнуляем инпут
        else if(isUserMessageToShot) {setError(true)} // если пытаемся добавить пустую таску, то добавить ошибку (если error в стейте равно true, то показывается ошибка о том, что слишком короткая строчка (


    }

    //создаем универсальный создатель функции, который вернет функцию, в которую передаст параметр, переданный в него )))))))
    const filterHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilterValue(filter)
    }

    //то же самое, но в другой записи, без ретурна и фигурных скобок
    const filterHandlerCreator2 = (filter: FilterValuesType) => () => props.changeFilterValue(filter)


    //старый вариант:
    const setAllFilterValue = () => props.changeFilterValue('all')
    const setActiveFilterValue = () => props.changeFilterValue('active')
    const setCompletedFilterValue = () => props.changeFilterValue('completed')



    const onKeyDownAddTask = (e:KeyboardEvent<HTMLInputElement>)=>{e.key === 'Enter'&&addTask()}
    const maxLengthMessage: number = 15
    const isUserMessageToLong: boolean = title.length >maxLengthMessage
    const isUserMessageToShot:boolean = title.trim().length<1
    const isUserMessageValid: boolean = !isUserMessageToLong && !isUserMessageToShot

    const userMaxLengthMassage = isUserMessageToLong && <div style={{color: 'red'}}>too long task</div>
    const errorMessage = error && <div style={{color: 'red'}}>title is required</div>
    const isBtnDisabled = !title.trim().length|| isUserMessageToLong


    return (
        <div className={'todolist'}>
            <h3>{props.title}</h3>
            <div>
                {/*вариант для юзрефа, когда не нужно в реальном времени отвлеживать, что именно находится в инпуте*/}
                {/*<input ref={addTaskInput}/>*/}
                {/*<button onClick={addTask}>+</button>*/}
                {/*вариант с постоянным отслеживанием ввода*/}
                {/*в value в инпуте устанавливаем значение из title, то есть в режиме раельного времени мы видим, что находится в локальном стейте и до момента отправки формы мы отслеживаем и можем проводить валидацию введенных данных в реальном времени*/}
                <input
                    placeholder= 'Enter task title'
                    value={title}
                    onChange={changeLocalTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={error || isUserMessageToLong? 'input-error': ''}/>
                {/*кнопка становится неактивной disabled={true}, когда выполняются указанные нами условия(ввели пустую строку, либо одни пробелы, или ввели текст длиннее 15 символов)*/}
                <button disabled={isBtnDisabled} onClick={addTask}>+</button>
                {/*следующие дивки будут показаны только в случае выполнения условий, которые стоят у них в начале (в первом случае длина строки без пробелов более 15 символов, в втором случае - если состояи стейта с ошибкой будет true*/}
                {userMaxLengthMassage}
                {errorMessage}

            </div>
            <TaskList
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus = {props.changeTaskStatus}/>
            <div className='filter-btn-container'>
                {/*онклики в баттонах будут выполнены сразу же, после загрузки страницы, (т.к. стоит вызов функции), но вместо себя оставит колбэк функцию с переданным в нее соответствующий параметр*/}
                <button
                    className={props.filter === 'all'? 'active-filter-btn': 'filter-btn'}
                    onClick={filterHandlerCreator('all')}
                >All
                </button>
                <button
                    className={props.filter === 'active'? 'active-filter-btn': 'filter-btn'}
                    onClick={filterHandlerCreator('active')}
                >Active
                </button>
                <button className={props.filter === 'completed'? 'active-filter-btn': 'filter-btn'}
                        onClick={filterHandlerCreator('completed')}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;





