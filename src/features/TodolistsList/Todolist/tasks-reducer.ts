import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskType} from "../../../api/todolists-api";
import {AppRootStateType, AppThunk} from '../../../app/store';
import {setAppErrorAC, setAppStatusAC} from '../../../app/app-reducer';


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASK':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todolistId} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: 'SET-TASK', todolistId, tasks} as const)

// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistId).then((res) => {
        dispatch(setTasksAC(todolistId, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
    })
}
export const removeTaskTC = (todolistId: string, id: string): AppThunk => (dispatch) => {
    todolistAPI.deleteTask(todolistId, id).then(() => {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    })
}
export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, title).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
            dispatch(setAppStatusAC('failed'))
        }
    })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            throw new Error("task not found in the state")
        }
        const apiModel: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todolistAPI.updateTask(todolistId, taskId, apiModel).then(() => {
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
        })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof setTasksAC>
