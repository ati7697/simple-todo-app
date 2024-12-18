import React, { Component } from 'react';
import './../App.css'
import { useState } from "react";


export default class AppClass extends Component {

    constructor(props) {
        super(props)

        const savedTodos = localStorage.getItem("todos")

        this.state = {
            todos: savedTodos ? JSON.parse(savedTodos) : [],
        }

        this.submitNewTask = (event) => {
            event.preventDefault();
                this.setState(prevState => {
                    const newstate = {
                        ...prevState,
                        todo_title: "",
                        todos: [...prevState.todos, {id: prevState.todos.length + 1, title: prevState.todo_title, completed: false}]
                    }

                    this.setItemToLocalStorage(newstate)
                    return newstate
                })
        }

        this.deleteTask = (id) => {
            const updatedTodos = this.state.todos.filter(todo => todo.id !== id)
            this.setState(prevState => {
                const newState = {
                    ...prevState,
                    todo_title: "",
                    todos: updatedTodos
                }

                this.setItemToLocalStorage(newState)

                return newState
            })

        }

        this.deleteCompletedTasks = () => {
           const uncompeletedTask = this.state.todos.filter(task => task.completed === false)

            this.setState(prevState => {
                const newState = {
                    ...prevState,
                    todo_title: "",
                    todos: uncompeletedTask
                }

                this.setItemToLocalStorage(newState)

                return newState
            })
        }

        this.removeAllTasks = () => {
            this.setState(prevState => {
                const emptyState = {
                    ...prevState,
                    todos: []
                }

                this.setItemToLocalStorage(emptyState)

                return emptyState
            })
        }

        this.checkAllTasks = () => {
            this.setState(prevState => {
                const checkedState = {
                    todos: prevState.todos.map(todo => {
                        todo.completed = true
                        return todo
                    })
                }

                this.setItemToLocalStorage(checkedState)

                return checkedState
            })
        }

        this.uncheckAllTasks = () => {
            this.setState(prevState => {
                const uncheckedState = {
                    todos: prevState.todos.map(todo => {
                        todo.completed = false
                        return todo
                    })
                }

                this.setItemToLocalStorage(uncheckedState)

                return uncheckedState
            })
        }


        this.completeTask = (id) => {
            const updatedTodos = this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
            this.setState(prevState => {
                const newState = {
                    todos: updatedTodos
                }

                this.setItemToLocalStorage(newState)

                return newState
            })
        }

        this.setItemToLocalStorage = (newState) => {
            localStorage.setItem("todos", JSON.stringify(newState.todos))
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
                        className="flex gap-2 px-2 mx-auto">
                        <input
                            type="text"
                            placeholder="Enter your task"
                            className="w-fit border rounded shadow px-5 py-2"
                            value={ this.state.todo_title || "" }
                            onChange={(event) => this.setState(prev => ({...prev, todo_title: event.target.value}))}
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

                                        <input
                                            checked={ todo.completed }
                                            onClick={ () => this.completeTask(todo.id) }
                                            type="checkbox"/>
                                        <span
                                            className={ todo.completed ? "line-through" : "" }
                                        >{ todo.title }</span>
                                    </div>
                                    <button onClick={ () => this.deleteTask(todo.id) }>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                              stroke="currentColor" className="size-5 font-bold">
                                            <path d="M6 18 18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </li>
                            ) }
                        </ul>
                    </div>

                    <div
                        className={ this.state.todos.length > 0 ? "flex gap-2" : "hidden" }>
                        <button
                            onClick={ this.deleteCompletedTasks }
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Remove Completed Tasks
                        </button>

                        <button
                            onClick={ this.removeAllTasks }
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Remove All
                        </button>

                        <button
                            onClick={ this.checkAllTasks }
                            className={! this.isAllTasksNotCompleted ? "hidden" : "bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" }>
                            Check All
                        </button>
                        <button
                            onClick={ this.uncheckAllTasks }
                            className={this.isAllTasksCompleted ? "hidden" : "bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" }
                        >
                            Uncheck All
                        </button>
                    </div>
                    <div>
                        <p className={ this.state.todos.length > 0 ? "hidden" : "text-center text-gray-500" }>
                            No tasks available
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

