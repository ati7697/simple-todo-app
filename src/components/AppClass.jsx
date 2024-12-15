import React, { Component } from 'react';
import './../App.css'
import { useState } from "react";


export default class AppClass extends Component {

    constructor(props) {
        super(props)


        const savedTodos = localStorage.getItem("todos")

        this.state = {
            todos: [
                {
                    id: 1,
                    title: "shopping",
                    completed: false
                },
                {
                    id: 2,
                    title: "cooking",
                    completed: false
                },
                {
                    id: 3,
                    title: "cleaning",
                    completed: false
                },
            ]
        }

        this.newTask = ""

        this.submitNewTask = (event) => {
            event.preventDefault();

            if (this.newTask) {
                const updatedTodos = [
                    ...this.state.todos,
                    {
                        id: this.state.todos.length + 1,
                        title: this.newTask,
                        completed: false
                    }
                ]
                this.setState(prevState => {
                    return {
                        todos: updatedTodos
                    }
                })
                this.newTask = ""
            }
        }
    }

    render() {
        return (
            <div>
                <div className="flex flex-col mx-auto p-9 my-64 rounded-2xl shadow-xl w-fit gap-2 bg-white">
                    <h1 className="text-center text-xl p-2 font-bold">To do App</h1>
                    <form
                        action={"#"}
                        onSubmit={ this.submitNewTask }
                        onChange={(event) => this.newTask = event.target.value}
                        className="flex gap-2 px-2">
                        <input
                            type="text"
                            placeholder="Enter your task"
                            className="w-fit border rounded shadow px-5 py-2"
                        />

                        <button
                            type="submit"
                            onSubmit={ this.submitNewTask }
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Task
                        </button>

                    </form>

                    <div className="flex gap-3 justify-between mx-2 my-2 text-sm text-gray-700">
                        <button className="bg-gray-200 py-1 px-3 rounded">
                            All
                        </button>

                        <button className="hover:bg-gray-100 py-1 px-3 rounded">
                            Completed
                        </button>
                        <button className="hover:bg-gray-100 py-1 px-3 rounded">
                            Active
                        </button>
                    </div>

                    <div>
                        <ul className="space-y-2">
                            { this.state.todos.map((todo, index) =>
                                <li
                                    key={ todo.id }
                                    className="flex gap-2 text-gray-700 justify-between hover:bg-gray-100 rounded px-2 py-4 capitalize"
                                >
                                    <div className="space-x-2">
                                        <input type="checkbox"/>
                                        <span>{ todo.title }</span>
                                    </div>
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                              stroke="currentColor" className="size-5 font-bold">
                                            <path d="M6 18 18 6M6 6l12 12"/>
                                        </svg>
                                    </span>
                                </li>
                            ) }
                        </ul>
                    </div>

                    <div className="flex gap-2">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Remove Completed
                        </button>

                        <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Check All
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

