import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch< AppRootStateType,
    unknown,
    AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction
    >

export const store = createStore(rootReducer, applyMiddleware(thunk));


// @ts-ignore
window.store = store;