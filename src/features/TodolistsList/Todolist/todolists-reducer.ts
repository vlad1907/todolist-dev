import {todolistAPI, TodolistType} from "../../../api/todolists-api";
import {AppThunk} from '../../../app/store';


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state;
    }
}

// actions
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', title, id} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    todolistAPI.getTodolists().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistAPI.deleteTodolist(todolistId).then(() => {
        dispatch(removeTodolistAC(todolistId))
    })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistAPI.createTodolist(title).then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
    todolistAPI.updateTodolistTitle(id, title).then(() => {
        dispatch(changeTodolistTitleAC(id, title))
    })
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistActionType

export  type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>



