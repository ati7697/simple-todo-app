import React, { Component } from 'react'
import BreadCrumbs from "./BreadCrumbs";

export default class Flashcard extends Component {
    render() {
        return (
            <div>
                <BreadCrumbs/>
                <div className="flex flex-col md:mx-auto p-6 md:my-64 md:rounded-2xl shadow-xl h-screen md:max-w-screen-sm md:max-h-max gap-2 bg-white">
                <h1 className="text-2xl font-bold mb-4">Flashcard</h1>
            </div>
            </div>
        );
    }
}

