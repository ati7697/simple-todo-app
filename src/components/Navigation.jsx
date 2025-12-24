import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import TodoApp from './TodoApp';
import Flashcard from './Flashcard';

export default function Navigation() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/todo" element={<TodoApp />} />
            <Route path="/flashcard" element={<Flashcard />} />
        </Routes>
    );
}
