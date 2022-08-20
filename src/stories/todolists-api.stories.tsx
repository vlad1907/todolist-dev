import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolists-api";

export default {
    title: 'API'
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then(
            (res) => {
                setState(res.data)
            }
        )
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("YOYOYOY").then(
            (res) => {
                setState(res.data)
            }
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = 'da15cace-3c15-4c18-a632-35717e4dff83'
        todolistAPI.deleteTodolist(todolistID).then(
            (res) => {
                setState(res.data)
            }
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '231da4e0-e193-4335-9316-b42b3c97a974'
        todolistAPI.updateTodolistTitle(todolistID, "BLABLA").then(
            (res) => {
                setState(res.data)
            }
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '231da4e0-e193-4335-9316-b42b3c97a974'
        todolistAPI.getTasks(todolistID).then(
            (res) => {
                setState(res.data)
            }
        )
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '231da4e0-e193-4335-9316-b42b3c97a974'
        const taskId = ''
        todolistAPI.createTask(todolistID, taskId).then(
            (res) => {
                setState(res.data)
            }
        )
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
// export const UpdateTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistID = '231da4e0-e193-4335-9316-b42b3c97a974'
//         const taskId = ''
//         todolistAPI.updateTask(todolistID, taskId).then(
//             (res) => {
//                 setState(res.data)
//             }
//         )
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '231da4e0-e193-4335-9316-b42b3c97a974'
        const taskId = ''
        todolistAPI.deleteTask(todolistID, taskId).then(
            (res) => {
                setState(res.data)
            }
        )
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

