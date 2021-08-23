import React from 'react';
import { TodoItem } from './TodoItem';
import { makeStyles } from '@material-ui/styles';

export function TodoList({todos, toggleTodo}) {

    const useStyles = makeStyles ({
        listOfItems:{
            minHeight:"35px",
            minWidth:"80%",
            margin:"20px",
            padding:"5px",
            borderRadius:"15px",
            border:"none",
            backgroundColor:"rgba(13, 13, 13, 0.65)",
        }
    });

    const classes = useStyles();

    return (
        <ul className={classes.listOfItems}>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
            ))}
        </ul>
    );
}
