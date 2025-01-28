import './../App.css'
import React, { Component } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, EllipsisVerticalIcon, XMarkIcon,PlusCircleIcon } from '@heroicons/react/20/solid'
import {PencilIcon, PencilSquareIcon} from "@heroicons/react/24/outline";

export default class AppClass extends Component {

    constructor(props) {
        super(props)

        const savedTodos = localStorage.getItem("todos")

        this.state = {
            todos: savedTodos ? JSON.parse(savedTodos) : [],
            isEditing: false,
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
        this.editTask = (id) => {

            this.setState(prevState => {
                const updatedTodos = prevState.todos.map(todo => {
                    if (todo.id === id) {
                        todo.title = prevState.todo_title
                    }
                    return todo
                })

                const newState = {
                    ...prevState,
                    todo_title: "",
                    todos: updatedTodos
                }

                this.setItemToLocalStorage(newState)

                return newState
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

        this.showAllTasks = () => {
            return this.setState(prevState => {
                return {
                    ...prevState,
                    todos: JSON.parse(localStorage.getItem("todos"))
                }
            })
        }

        this.showCompletedTasks = () => {
            const completedTasks = JSON.parse(localStorage.getItem("todos")).filter(task => task.completed === true)

            this.setState(prevState => {
                return {
                    ...prevState,
                    todos: completedTasks
                }
            })
        }

        this.showNotCompletedTasks = () => {
            const activeTasks = JSON.parse(localStorage.getItem("todos")).filter(task => task.completed === false)

            this.setState(prevState => {
               return {
                    ...prevState,
                    todos: activeTasks
               }

            })
        }

        this.setItemToLocalStorage = (newState) => {
            localStorage.setItem("todos", JSON.stringify(newState.todos))
        }

        this.filterOptions = [
            { name : "All tasks", action: this.showAllTasks },
            { name : "Completed tasks", action: this.showCompletedTasks },
            { name : "Active tasks", action: this.showNotCompletedTasks }
        ]



    }

    render() {
        const { isEditing } = this.state;
        return (
            <div>
                <div className="flex flex-col md:mx-auto p-6 md:my-64 md:rounded-2xl shadow-xl h-screen md:h-fit md:w-fit gap-2 bg-white">
                    <h1 className=" text-xl p-2 font-bold">To do App</h1>

                    <form
                        action={ "#" }
                        onSubmit={ this.submitNewTask }
                        className="flex gap-2 px-2">
                        <input
                            type="text"
                            placeholder="Enter your task"
                            className="border rounded shadow px-5 py-2 w-full h-full"
                            value={ this.state.todo_title || "" }
                            onChange={ (event) => this.setState(prev => ({...prev, todo_title: event.target.value})) }
                        />

                        <button
                            type="submit"
                            onSubmit={ this.submitNewTask }
                            className="text-blue-500"
                        >
                            <span className="hidden md:flex bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 rounded">Add Task</span>
                            <PlusCircleIcon className="md:hidden size-8" aria-hidden="true"/>
                        </button>

                    </form>

                    <div className="flex justify-between m-2">
                        <div className="-ml-px grid grid-cols-1">
                            <select
                                id="filter"
                                name="filter"
                                aria-label="Filter tasks"
                                onChange={ (event) => this.filterOptions[event.target.selectedIndex].action() }

                                className="col-start-1 row-start-1 w-full appearance-none rounded bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                { this.filterOptions.map((option, index) => (
                                  <option
                                        key={ index }
                                        className="text-gray-900"
                                  >
                                      { option.name }
                                  </option>
                                )) }
                            </select>
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                        </div>
                        {/*actions*/}
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton
                                    className="flex w-full appearance-none bg-white py-1.5 text-base text-gray-900 sm:text-sm/6"
                                >
                                    <span className="">Actions</span>
                                    <EllipsisVerticalIcon className="ml-2 h-5 w-5 text-gray-400"  aria-hidden="true"/>
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <button
                                            onClick={ this.deleteCompletedTasks }
                                            className="flex w-full justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        >
                                            Remove Completed Tasks
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={ this.removeAllTasks }
                                            className="flex w-full justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        >
                                            Remove All Tasks
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={ this.checkAllTasks }
                                            className="flex w-full justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        >
                                            Check All
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={ this.uncheckAllTasks }
                                            className="flex w-full justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        >
                                            Uncheck All
                                        </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>

                    <div>
                        <ul className="space-y-2">
                            { this.state.todos.map((todo, index) =>
                                <li
                                    key={ todo.id }
                                    className="flex gap-2 text-gray-700 justify-between hover:bg-gray-100 rounded p-2 capitalize"
                                >
                                    <div className="flex gap-2">
                                        <div className={ isEditing ?  "hidden" : "flex gap-2" }>
                                            <input
                                                checked={ todo.completed }
                                                onClick={ () => this.completeTask(todo.id) }
                                                type="checkbox"

                                            />
                                            <span className={ todo.completed ? "line-through" : "" }>
                                                { todo.title }
                                            </span>
                                        </div>

                                        <form
                                            action={ "#" }
                                            onSubmit={ (event) => this.editTask(todo.id) }
                                            className={ isEditing ? "flex gap-2" : "hidden" }
                                        >
                                            <input
                                                className={ "hover:bg-gray-100" }
                                                type={ "text" }
                                                value={ todo.title }
                                            />
                                            <button>
                                                Save
                                            </button>
                                        </form>

                                    </div>

                                    <div className="space-x-2">
                                        <button
                                            onClick={() => this.setState({ isEditing: true })}
                                        >
                                            <PencilSquareIcon className="size-5 text-gray-500" aria-hidden="true"/>
                                        </button>
                                        <button onClick={ () => this.deleteTask(todo.id) }>
                                            <XMarkIcon className="size-5 text-gray-500" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </li>
                            ) }
                        </ul>
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

