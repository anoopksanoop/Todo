import React, { useEffect, useState } from 'react';
import { fetchTodos, deleteTodo } from './service/api';
import './HomePage.css';  // Importing the CSS file for styling

const HomePage = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos().then(response => setTodos(response.data));
    }, []);

    const handleDelete = id => {
        deleteTodo(id).then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        });
    };

    return (
        <div className="home-container">
            <h1 className="page-title">Todo List</h1>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        <span className="todo-title">{todo.title}</span> - 
                        <span className={`todo-status ${todo.status}`}>{todo.status}</span>
                        <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
