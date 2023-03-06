import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemInputPropsType = {
    addItem: (title: string) => void
    placeholder?: string

}
export const AddItemInput = (props: AddItemInputPropsType) => {
    const [title, setTitle] = useState<string>('')//локальный стейт для хранения значения, введенного в инпуте
    const [error, setError] = useState<boolean>(false)//локальный стейт для хранения значения, есть ли ошибка ввода(пока только ошибка пустой строки, ошибка превышения лимита введенных символов тут не обрабатывается)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false) //снимаем ошибку, если начали печатать
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (isUserMessageValid) {
            props.addItem(trimmedTitle);
            setTitle('')
        }//если введен текст не длиннее 15 символов и не короче одного, то добавляем таску и обнуляем инпут
        else if (isUserMessageToShot) {
            setError(true)
        } // если пытаемся добавить пустую таску, то добавить ошибку (если error в стейте равно true, то показывается ошибка о том, что слишком короткая строчка (
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addItem()
    }

    //то же самое, но в другой записи, без ретурна и фигурных скобок
    // const filterHandlerCreator2 = (filter: FilterValuesType) => () => props.changeFilterValue(props.todoListId, filter)

    //старый вариант:
    // const setAllFilterValue = () => props.changeFilterValue(props.todoListId, 'all')
    // const setActiveFilterValue = () => props.changeFilterValue(props.todoListId, 'active')
    // const setCompletedFilterValue = () => props.changeFilterValue(props.todoListId, 'completed')

    const maxLengthMessage: number = 15
    const isUserMessageToLong: boolean = title.length > maxLengthMessage
    const isUserMessageToShot: boolean = title.trim().length < 1
    const isUserMessageValid: boolean = !isUserMessageToLong && !isUserMessageToShot

    const userMaxLengthMassage = isUserMessageToLong && <div style={{color: 'red'}}>too long task</div>
    const errorMessage = error && <div style={{color: 'red'}}>title is required</div>
    const isBtnDisabled = !title.trim().length || isUserMessageToLong
    return (
        <div>
            {/*вариант для юзрефа, когда не нужно в реальном времени отвлеживать, что именно находится в инпуте*/}
            {/*<input ref={addTaskInput}/>*/}
            {/*<button onClick={addTask}>+</button>*/}
            {/*вариант с постоянным отслеживанием ввода*/}
            {/*в value в инпуте устанавливаем значение из title, то есть в режиме раельного времени мы видим, что находится в локальном стейте и до момента отправки формы мы отслеживаем и можем проводить валидацию введенных данных в реальном времени*/}
            <input
                placeholder={props.placeholder||""} //добавит placeholder, если пришел в пропсах, иначе оставит пустым
                value={title}
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownAddTask}
                className={error || isUserMessageToLong ? 'input-error' : ''}/>
            {/*кнопка становится неактивной disabled={true}, когда выполняются указанные нами условия(ввели пустую строку, либо одни пробелы, или ввели текст длиннее 15 символов)*/}
            <button disabled={isBtnDisabled} onClick={addItem}>+</button>
            {/*следующие дивки будут показаны только в случае выполнения условий, которые стоят у них в начале (в первом случае длина строки без пробелов более 15 символов, в втором случае - если состояи стейта с ошибкой будет true*/}
            {userMaxLengthMassage}
            {errorMessage}
        </div>)


}