import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTodo, updateTodo } from './service/api';
import './EditTodoPage.css'; // Importing the new CSS file for styling

const EditTodoPage = () => {
    const { id } = useParams(); // Get the todo ID from the URL
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const navigate = useNavigate();

    useEffect(() => {
        const getTodo = async () => {
            try {
                const { data } = await fetchTodo(id);
                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
            } catch (error) {
                console.error('Error fetching todo:', error);
                alert('Failed to fetch todo.');
            }
        };

        getTodo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            alert('Title is required');
            return;
        }

        try {
            await updateTodo(id, { title, description, status });
            navigate('/'); // Redirect to the home page
        } catch (error) {
            console.error('Error updating todo:', error);
            alert('Failed to update todo.');
        }
    };

    return (
        <div className="edit-todo-container">
            <h1 className="form-title">Edit Todo</h1>
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
                <button type="submit" className="submit-btn">Update Todo</button>
            </form>
        </div>
    );
};

export default EditTodoPage;
