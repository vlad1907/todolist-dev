import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
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
    return editMode ? <input onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title} autoFocus/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
}