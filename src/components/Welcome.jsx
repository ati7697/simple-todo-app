import React from "react";
import { Link } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs";

const items = [
    { id: 1, name: 'TodoApp', path: '/todo' },
    { id: 2, name: 'FlashCard', path: '/flashcard' },
];

export default function Welcome() {
    return (
        <div>
            <BreadCrumbs/>
            <div className="flex flex-col md:mx-auto p-6 md:my-64 md:rounded-2xl shadow-xl h-screen md:max-w-screen-sm md:max-h-max gap-2 bg-white">
            </div>
        </div>
    );
}
