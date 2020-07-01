import React from 'react'
import TaskItem from './TaskItem'
import { Task } from '../Types'
import {CSSTransition,TransitionGroup} from 'react-transition-group'

type Props = {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {

    const updateTask = (task: Task) => {
        setTasks(prev => { 
            var newTasks = prev.map(t => t.id === task.id
                ? { ...task }
                : t)
            localStorage.setItem("TaskList", JSON.stringify(newTasks))
            return newTasks
        })
    }

    const handleDone = (task: Task) => {
        setTasks(prev => { 
            var newTasks = prev.map(t => t.id === task.id
                ? { ...task, done: !task.done }
                : t)
            localStorage.setItem("TaskList", JSON.stringify(newTasks))
            return newTasks
        })
    }
    
    const handleDelete = (task: Task) => {
        setTasks(prev => {
            var newTasks = prev.filter(t => t.id !== task.id)
            localStorage.setItem("TaskList", JSON.stringify(newTasks))
            return newTasks
         })
    }


    return (
        <div className="inner">
            {
                tasks.length <= 0 ? 'There are no tasks to do left.' :
                <TransitionGroup component="ul" classname="task-list">
                
                { tasks.map(task => (
                    <CSSTransition
                        key={task.id}
                        timeout={ {
                            enter:300,
                            exit:700
                        }}
                        classNames="fade"
                    >
                    <TaskItem
                        task={task}
                        updateTask={updateTask}
                        handleDone={handleDone}
                        handleDelete={handleDelete}
                    />
                    </CSSTransition>
                )) }
            
                </TransitionGroup>
            }
        </div>
    )
}

export default TaskList