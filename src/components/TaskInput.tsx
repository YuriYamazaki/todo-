import React, { useState } from 'react'
import { Task } from '../Types'
import {useForm } from 'react-hook-form'

type FormData={
    title:string
}

type Props = {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskInput: React.FC<Props> = ({ tasks, setTasks}) => {
    const [ inputTitle, setInputTitle ] = useState('')
    const [ count, setCount ] = useState(tasks.length + 1)
    
    const {register,handleSubmit, errors,reset} = useForm<FormData>()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value)
    }

    const handleOnSubmit = () => {
        setCount(count + 1)

        const newTask: Task = {
            id: count,
            title: inputTitle,
            done: false  
        }

        setTasks([newTask, ...tasks])
        setInputTitle('')

        // Add LocalStorage
        localStorage.setItem("TaskList", JSON.stringify(tasks))
    }

    return (
        <form onSubmit = {handleSubmit(handleOnSubmit)}className="input-form">
            <div className="inner">
                <input
                    type="text"
                    name="title"
                    className="input"
                    value={inputTitle}
                    onChange={handleInputChange}
                    placeholder="Please add your tasks!"
                    ref={register({
                        required:'You definitely need to put a title.'
                    
                        
                    })}
                />
                <button  className="btn is-primary">add</button>
                {errors.title && <span className= "error-message">{
                    errors.title.message
                    }</span>} 
            </div>
        </form>
    )
}

export default TaskInput