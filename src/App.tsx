import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    let initTasks: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]

    let [tasks, setTasks] = useState(initTasks);

    function removeTask(id: number) {
        let filteredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}


export default App;
