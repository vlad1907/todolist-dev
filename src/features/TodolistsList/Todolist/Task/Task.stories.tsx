import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";


export default {
    title: 'Task Component',
    component: Task,
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    // },
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task removed")

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{
                id: '1', status: TaskStatuses.Completed, title: "CSS", priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: '',
                description: ''
            }}
            todolistID={"todolistID1"}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
        />
        <Task
            task={{
                id: '2',
                status: TaskStatuses.InProgress, title: "JS",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: '',
                description: ''
            }}
            todolistID={"todolistID2"}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
        />
    </>
}