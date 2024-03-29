import {addTaskTC, fetchTasksTC, removeTaskTC, tasksReducer, TasksStateType, updateTaskTC} from './tasks-reducer';
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../../../api/todolists-api";


let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            },
            {
                id: "2", title: "JS", description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            },
            {
                id: "3", title: "React", description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            },
            {
                id: "2", title: "milk", description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            },
            {
                id: "3", title: "tea", description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    let param = {taskId: "2", todolistId: "todolistId2"};
    const action = removeTaskTC.fulfilled(param, "requestId", param);

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1", title: "CSS", description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            },
            {
                id: "2", title: "JS", description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            },
            {
                id: "3", title: "React", description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            },
            {
                id: "3", title: "tea", description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 1,
                addedDate: ''
            }
        ]
    });

});
test('correct task should be added to correct array', () => {
    let task = {
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        order: 0,
        priority: 0,
        startDate: "",
        description: "",
        id: "id exist"
    };
    const action = addTaskTC.fulfilled(task, "requestId", {title: task.title, todolistId: task.todoListId});
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status === 2).toBe(false);
})
test('status of specified task should be changed', () => {
    let updateModel = {taskId: "2", domainModel: {status: TaskStatuses.New}, todolistId: "todolistId2"};
    const action = updateTaskTC.fulfilled(updateModel, "requestId", updateModel);
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status === TaskStatuses.Completed).toBeFalsy();
    expect(endState["todolistId1"][1].status === TaskStatuses.Completed).toBeTruthy();
});
test('title of specified task should be changed', () => {
    let updateModel = {taskId: "2", domainModel: {title: "Milkyway"}, todolistId: "todolistId2"};
    const action = updateTaskTC.fulfilled(updateModel, "requestId", updateModel);
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Milkyway");
    expect(endState["todolistId1"][1].title).toBe("JS");
});
test('new array should be added when new todolist is added', () => {
    let payload = {
        todolist: {
            id: "blalala",
            title: "new todolist",
            order: 0,
            addedDate: ''
        }
    };
    const action = addTodolistTC.fulfilled(payload, "requestId", payload.todolist.title);
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistTC.fulfilled({id: "todolistId2"}, "requestId", "todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
    let payload = {
        todolists: [
            {id: "1", title: "title 1", order: 0, addedDate: ""},
            {id: "2", title: "title 2", order: 0, addedDate: ""}
        ]
    };
    const action = fetchTodolistsTC.fulfilled(payload, "requestId")

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
    // const action = setTasksAC({todolistId: "todolistId1", tasks: startState["todolistId1"]})
    const action = fetchTasksTC.fulfilled({
        todolistId: "todolistId1",
        tasks: startState["todolistId1"]
    }, "requestId", "todolistId1")

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})


