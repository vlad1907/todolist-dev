import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer';
import {tasksReducer} from '../features/TodolistsList/Todolist/tasks-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType,
    unknown,
    AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    AnyAction>

export const store = createStore(rootReducer, applyMiddleware(thunk));


// @ts-ignore
window.store = store;