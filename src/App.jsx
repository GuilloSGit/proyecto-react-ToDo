import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from "./components/TodoList";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
    mainContainer: {
        fontFamily:"sans-serif",
        color:"white",
        display:"flex",
        flexDirection:"column",
        flexWrap:"nowrap",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(3, 3, 0, 0.696)",
        borderRadius:"20px",
        width:"95%",
        maxWidth:"700px",
        minHeight:"70%",
    },
    addAndDeleteButton: {
        backgroundColor:"none",
        margin:"20px",
        display:"flex",
        flexDirection:"row",
    },
    inputTasks:{
        width:"80%",
        lineHeight:"2rem",
        textAlign:"left",
        backgroundColor:"transparent",
        border:"none",
        borderBottom:"white solid",
        color:"white",
        letterSpacing:"2px",
        paddingLeft:"25px",
        "&:hover":{
            backgroundColor:"rgba(13, 13, 13, 0.65)",
        },
        "&:onfocus":{
            backgroundColor:"rgba(13, 13, 13, 0.65)",
            border:"none",
        }
    },
    msgTasks:{
        margin:"10px",
        textAlign:"center",
        lineHeight:"1.8rem",
        fontSize:"20px"
    },
    numOfTasks:{
        backgroundColor:"rgba(13, 13, 13, 0.65)",
        padding:"4px",
        boxShadow:"3px 3px gray",
    },
    divTareas:{
        minWidth:"85%",
        margin:"35px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
    },
    label:{
        marginBottom:"10px",
        display:"inline-block",
        fontWeight:"600",
        color:"white",
        fontSize:"1rem",
        alignSelf:"left",
    },
    button:{
        background:"rgba(13, 13, 13, 0.65)",
        padding:"10px",
        border:"none",
        margin:"10px",
        fontSize:"25px",
        borderRadius:"20px",
        boxShadow:"inset -3px -3px rgba(83, 83, 83, 0.95)",
        "&:hover":{
            cursor:"pointer",
            boxShadow:"inset -2px -2px rgba(123, 123, 123, 0.95)",
        }
    }
});

const KEY = 'todoApp.todos';

export function App(){

    const classes = useStyle();

    const [todos, setTodos] = useState([ 
        { id:0, task: "No tienes tareas", completed: true },
    ]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todoApp.todos', JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if(task === '') return;
        
        setTodos((prevTodos) => {
            return [...prevTodos, {id:uuidv4(), task, completed:false}]
        });

        todoTaskRef.current.value = null;
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    return (
        <Fragment>
            <div className={classes.mainContainer}>
                <TodoList todos={ todos }  toggleTodo={toggleTodo} className={classes.listOfTasks}/>
                <div className={classes.divTareas}>
                    <label for="tareas" className={classes.label}>Agregar tarea</label>
                    <input ref={todoTaskRef} type="text" className={classes.inputTasks}/>
                </div>
                <div className={classes.addAndDeleteButton}>
                    <button onClick={handleTodoAdd} className={classes.button}>➕</button>
                    <button onClick={handleClearAll} className={classes.button}>🗑️</button>
                </div>
                <div className={classes.msgTasks}>Te queda(n) <span className={classes.numOfTasks}> {todos.filter((todo) => !todo.completed).length}</span><br/> tareas pendientes</div>
            </div>
        </Fragment>
    );
}