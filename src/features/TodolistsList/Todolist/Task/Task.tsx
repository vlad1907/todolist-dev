import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistID: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = useCallback(() => props.removeTask(props.task.id, props.todolistID), [props.task.id, props.todolistID])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID)
    }, [props.task.id, props.todolistID]);

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistID);
    }, [props.task.id, props.todolistID])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeStatusHandler}
            checked={props.task.status === TaskStatuses.Completed}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})