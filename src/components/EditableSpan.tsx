import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';

export type EditableSpanPropsType = {
    title: string
    onChange: (newTitleValue: string) => void
    className?: string

}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)//стейт для хранения режима отображения (просмотр-ViewMode или редактирование-EditMode)
    let [title, setTitle] = useState<string>('') //стейт для хранения вводимого значения (перезаписывается при onChange)

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        //console.log(event)
        setTitle(event.currentTarget.value)
    }
    let onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>)=>{
        //console.log(event)
        // if((event.code==="Enter"||event.code==="NumpadEnter") && event.ctrlKey)//так тоже работает
        if(event.key==="Enter"){
            activateViewMode()
        }
    }
    return (
        editMode
            ?
            // <input type="text" onChange={onChangeTitleHandler} onKeyDown={onKeyDownHandler} value={title} onBlur={activateViewMode} autoFocus={true} /> //старый вариант
            <TextField
                type="text"
                onChange={onChangeTitleHandler}
                onKeyDown={onKeyDownHandler}
                value={title}
                onBlur={activateViewMode}
                autoFocus={true}
                variant="standard"
            />
            :
            <span className={props.className || ''} onDoubleClick={activateEditMode}>
                {props.title}
            </span>
    )
}