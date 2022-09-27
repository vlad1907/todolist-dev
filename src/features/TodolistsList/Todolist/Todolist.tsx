import React, {useCallback, useEffect} from "react";
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "./todolists-reducer";
import {useAppDispatch} from '../../../app/hooks';
import {fetchTasksTC} from './tasks-reducer';


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    console.log('Todolist called')

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolist.id), [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolist.id), [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolist.id), [props.changeFilter, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.todolist.id, props.changeTodolistTitle])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)

    }, [props.addTask, props.todolist.id])

    let tasksForTodolist = props.tasks;
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {
                    tasksForTodolist.map(t => <Task
                        todolistID={props.todolist.id}
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        key={t.id}
                    />)
                }
            </div>
            <div>
                <Button variant={props.todolist.filter === 'all' ? "contained" : "text"} onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.todolist.filter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.todolist.filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
})

