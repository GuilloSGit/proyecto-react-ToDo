import React from 'react';
import { makeStyles } from "@material-ui/styles";

export function TodoItem({ todo, toggleTodo }) {
    
    const { id, task, completed } = todo;
    
    const useStyle = makeStyles({
        listOfTasks:{
            userSelect:"none",
            listStyleType:"none",
            fontSize:".9rem",
            color:"white",
            margin:"10px",
        },
        checkbox:{
            border:"none",
            marginRight:"3ch",
            transform:"scale(1.5)",
        },
    });
    
    const classes = useStyle();

    const handleTodoClick = () => {
        toggleTodo(id);
    }

    return (
        <li className={classes.listOfTasks}>
            <input type="checkbox" checked={completed} onChange={handleTodoClick} className={classes.checkbox}/>
            {task}
        </li>);
}
