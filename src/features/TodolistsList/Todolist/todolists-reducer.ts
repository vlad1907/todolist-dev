import {todolistAPI, TodolistType} from "../../../api/todolists-api";
import {AppThunk} from '../../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../../app/app-reducer';
import {handleServerNetworkError} from '../../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
           return  action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }

    }
})

export const todolistsReducer = slice.reducer
export const {
    setTodolistsAC,
    removeTodolistAC,
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    changeTodolistEntityStatusAC
} = slice.actions


// thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTodolists().then((res) => {
        dispatch(setTodolistsAC({todolists: res.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    todolistAPI.deleteTodolist(todolistId).then(() => {
        dispatch(removeTodolistAC({id: todolistId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTodolist(title).then((res) => {
        dispatch(addTodolistAC({todolist:res.data.data.item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    })
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
    todolistAPI.updateTodolistTitle(id, title).then(() => {
        dispatch(changeTodolistTitleAC({id:id, title:title}))
    })
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export  type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>



