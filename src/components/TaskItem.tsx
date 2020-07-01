import React from 'react'
import { Task } from '../Types'
import "react-datepicker/dist/react-datepicker.css"
import moment, { Moment } from 'moment'
import 'fontsource-roboto';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DatePicker ,MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

type Props = {
    task: Task
    updateTask: (task: Task) => void
    handleDone: (task: Task) => void
    handleDelete: (task: Task) => void
}

const TaskItem: React.FC<Props> = ({ task, updateTask, handleDone, handleDelete }) => {

    const initialDate = moment(task.dueDate != null ? task.dueDate : new Date())
    const handleChange = (date: MaterialUiPickersDate) => {
        task.dueDate = date?.toDate()
        updateTask(task)
    }

    return (
        <li className={task.done ? 'done' : ''}>
            <label>
                <input
                    type="checkbox"
                    className="checkbox-input"
                    onClick={() => handleDone(task)}
                    defaultChecked={task.done}
                />

                <div className="checkbox-label">{task.title}</div>
            </label>

            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    label="dueDate"
                    value={initialDate}
                    onChange={handleChange}
                />
            </MuiPickersUtilsProvider>
            

            <IconButton aria-label="delete"
                onClick={() => handleDelete(task)}
                className="btn is-delete">
                <DeleteIcon />
            </IconButton>
        </li>
    )
}



export default TaskItem