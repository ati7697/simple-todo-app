import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import TodoApp from './TodoApp';

export default function Navigation() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/todo" element={<TodoApp />} />
        </Routes>
    );
}
