import React from "react";
import { Link } from "react-router-dom";

const items = [
    { id: 1, name: 'TodoApp', path: '/todo' },
    { id: 2, name: 'FlashCard', path: '/flashcard' },
];

export default function BreadCrumbs() {
    return (
        <nav aria-label="Breadcrumb" className="flex border-b border-gray-200 bg-gray-50">
            <ol role="list" className="mx-auto flex w-full max-w-(--breakpoint-xl) space-x-4 px-4 sm:px-6 lg:px-8">
                <li className="flex">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-gray-400 hover:text-gray-500"
                        >
                            Home
                        </Link>
                    </div>
                </li>
                {items.map(item => (
                    <li key={item.name} className="flex">
                        <div className="flex items-center">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 44"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                                className="h-full w-6 shrink-0 text-gray-200"
                            >
                                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                            </svg>
                            <Link
                                to={item.path}
                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                {item.name}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
