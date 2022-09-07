import React, {ChangeEvent, useState} from "react";
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EditableSpan")
    let [title, setTitle] = useState("")
    let [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        return setTitle(e.currentTarget.value)
    }
    return editMode ? <TextField onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title} autoFocus/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
})