import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AddTodoPage from './AddTodoPage';
import EditTodoPage from './EditTodoPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add" element={<AddTodoPage />} />
                <Route path="/edit/:id" element={<EditTodoPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
