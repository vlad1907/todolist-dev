import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {ControlPoint} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    console.log("Additem is called")
    const [newTaskTitle, setNewTaskTitle] = useState("");

    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTask()
            setNewTaskTitle("");
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return;
        }
        addItem(newTaskTitle.trim());
        setNewTaskTitle("");
    }


    return <div>
        <TextField
            disabled={disabled}
            label={'Type value'}
            variant={'outlined'}
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addTask} color={'primary'}disabled={disabled}>
            <ControlPoint/>
        </IconButton>
    </div>
})