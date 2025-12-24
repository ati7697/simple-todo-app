import React from "react";
import { Link } from "react-router-dom";

const items = [
    { id: 1, name: 'TodoApp', path: '/todo' },
];

export default function Welcome() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">G'day!</h1>
            <ul className="space-y-2">
                {items.map(item => (
                    <li key={item.id} className="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
                        <Link
                            to={item.path}
                            className="text-blue-600 hover:underline"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
