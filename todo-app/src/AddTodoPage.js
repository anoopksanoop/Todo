import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTodo } from './service/api';
import './AddTodoPage.css';  // Importing  CSS 

const AddTodoPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            alert('Title is required');
            return;
        }

        try {
            await createTodo({ title, description, status });
            navigate('/'); // Redirect to the home page
        } catch (error) {
            console.error('Error creating todo:', error);
            alert('Failed to create todo.');
        }
    };

    return (
        <div className="add-todo-container">
            <h1 className="form-title">Add Todo</h1>
            <form onSubmit={handleSubmit} className="todo-form">
                <div className="form-group">
                    <label className="form-label">Title:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Status:</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Add Todo</button>
            </form>
        </div>
    );
};

export default AddTodoPage;
