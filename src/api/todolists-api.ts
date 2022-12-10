import axios, {AxiosResponse} from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'f6e09271-9951-4ca7-8fbf-c73bc4098a4f',
    },
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

// api
export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolistTitle(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistID}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<UpdateTaskType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistID: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskId}`)
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType<{ userId?: number }>>('auth/login')
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me')
    }
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type FieldsErrorsType = { field: string, error: string }

export type ResponseType<D = {}> = {
    resultCode: number
    fieldsErrors?: Array<FieldsErrorsType>
    messages: string[]
    data: D

}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    title: string
    id: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}