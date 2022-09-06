import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskType} from "../api/todolists-api";
import {TasksStateType} from "../AppWithRedux";
import {AppRootStateType, AppThunk} from './store';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
}

export type SetTasksActionType = {
    type: 'SET-TASK'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType

const initialState: TasksStateType = {
    /* [todolistId1]: [
         {id: v1(), title: "CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "React", isDone: false},
         {id: v1(), title: "Redux", isDone: false}
     ],
     [todolistId2]: [
         {id: v1(), title: "Book", isDone: true},
         {id: v1(), title: "Milk", isDone: true},

     ]*/
}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ?
                {
                    ...t,
                    ...action.model
                } : t)
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolist.id] = [];
            return stateCopy;
        }
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
        case 'SET-TASK': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state;

    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', taskId, model, todolistId}
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: 'SET-TASK', todolistId, tasks}
}

export const fetchTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.getTasks(todolistId).then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
    }
}

export const removeTaskTC = (todolistId: string, id: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.deleteTask(todolistId, id).then(res => {
            const action = removeTaskAC(id, todolistId);
            dispatch(action);
        })
    }
}

export const addTaskTC = (title: string, todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.createTask(todolistId, title).then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {

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
        todolistAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
        })
    }
}