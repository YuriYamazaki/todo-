import React, { useState } from 'react'
import TaskList from './components/TaskList'
import TaskInput from './components/TaskInput'
import { Task } from './Types'
import './App.css'


// LocalStorageから取得
const initialState: Task[] = JSON.parse(localStorage.getItem("TaskList") as string) as Task[] ||[]

const App: React.FC = () => {
  const [tasks, setTasks] = useState(initialState)

  return (
    <div>
        <TaskInput setTasks={setTasks} tasks={tasks} />
        <TaskList setTasks={setTasks} tasks={tasks} />
    </div>
  )
}


 
export default App