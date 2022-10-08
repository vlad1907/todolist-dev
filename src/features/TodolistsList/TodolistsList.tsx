import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './Todolist/todolists-reducer';
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from './Todolist/tasks-reducer';
import {TaskStatuses} from '../../api/todolists-api';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId);
        dispatch(thunk);
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId));
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {title: newTitle}, todolistId));
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string,) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistId, newTitle));
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return <>
        <Grid container style={{padding: "20px"}} justifyContent={"center"}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3} justifyContent={"center"}>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist todolist={tl}
                                      removeTodolist={removeTodolist}
                                      key={tl.id}
                                      tasks={tasksForTodolist}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeStatus}
                                      changeTaskTitle={changeTaskTitle}
                                      changeTodolistTitle={changeTodolistTitle}
                                      demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}

