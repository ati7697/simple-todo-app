import './../App.css'
import axios from 'axios'
import {Transition} from '@headlessui/react'

import React, {Component} from 'react'
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {ChevronDownIcon, EllipsisVerticalIcon, CheckCircleIcon} from '@heroicons/react/20/solid'
import {XMarkIcon} from '@heroicons/react/20/solid'

const API_BASE = 'http://myresume.test/api'

export default class AppClass extends Component {
    componentDidMount() {
        axios.get(`${API_BASE}/todos`)
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            });
    }

    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            todo_title: "",
            message: "",
            showMessage: false,
        };

        this.submitNewTask = (event) => {
            event.preventDefault();
            axios.post(`${API_BASE}/todos`, {title: this.state.todo_title})
                .then(response => {
                    console.log(response.data)
                    this.setState(prev => ({
                        todo_title: "",
                        todos: [...prev.todos, response.data]
                    }))
                })
                .catch(error => {
                    console.error("Error creating todo:", error);
                });
        }

        this.markAsEditing = (id) => {
            const updatedTodos = this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.isEditing = true
                }
                return todo
            })

            this.setState(prevState => {
                return {
                    ...prevState,
                    todos: updatedTodos
                }
            })
        }

        this.updateTask = (title, id) => {
            axios.put(`${API_BASE}/todos/${id}/update`, {title: title})
                .then(response => {
                    this.setState(prev => ({
                            todos: prev.todos.map(todo =>
                                todo.id === id ? {...todo, title: title, isEditing: false} : todo),
                            showMessage: true,
                            message: response.data.message
                        }),
                    );
                })
                .catch(error => {
                    console.error("Error updating todo:", error);
                });
        }

        this.cancelEdit = (event, id) => {
            this.setState(prevState => {
                const updatedTodos = prevState.todos.map(todo => {
                    if (todo.id === id) {
                        todo.isEditing = false
                    }
                    return todo
                })

                const newState = {
                    ...prevState,
                    isEditing: false,
                    todos: updatedTodos
                }

                this.setItemToLocalStorage(newState)

                return newState
            })
        }

        this.deleteTask = (id) => {
            axios.delete(`${API_BASE}/todos/${id}`)
                .then(() => {
                    this.setState(prev => ({
                        todos: prev.todos.filter(todo => todo.id !== id)
                    }));
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
            {name: "All tasks", action: this.showAllTasks},
            {name: "Completed tasks", action: this.showCompletedTasks},
            {name: "Active tasks", action: this.showNotCompletedTasks}
        ]


    }

    render() {
        return (
            <div>
                <div
                    aria-live="assertive"
                    className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
                >
                    <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                        <Transition show={this.state.showMessage}>
                            <div
                                className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white ring-1 shadow-lg ring-black/5 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0">
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <CheckCircleIcon aria-hidden="true" className="size-6 text-green-400"/>
                                        </div>
                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                            <p className="text-sm font-medium text-gray-900">{this.state.message}</p>
                                        </div>
                                        <div className="ml-4 flex shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    this.setState({showMessage: false})
                                                }}
                                                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                                            >
                                                <span className="sr-only">Close</span>
                                                <XMarkIcon aria-hidden="true" className="size-5"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
                <div
                    className="flex flex-col md:mx-auto p-6 md:my-64 md:rounded-2xl shadow-xl h-screen md:max-w-screen-sm md:max-h-max gap-2 bg-white">

                    <h1 className=" text-xl p-2 font-bold">To do App</h1>
                    <form
                        action={"#"}
                        onSubmit={this.submitNewTask}
                        className="w-full max-w-screen-sm lg:col-span-5 lg:pt-2">
                        <div className="flex gap-x-4">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="task"
                                name="task"
                                type="text"
                                required
                                placeholder="Enter your task"
                                value={this.state.todo_title || ""}
                                onChange={(event) => this.setState(prev => ({todo_title: event.target.value}))}
                                autoComplete="email"
                                className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            <button
                                type="submit"
                                className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-between m-2">
                        <div className="-ml-px grid grid-cols-1">
                            <select
                                id="filter"
                                name="filter"
                                aria-label="Filter tasks"
                                onChange={(event) => this.filterOptions[event.target.selectedIndex].action()}

                                className="col-start-1 row-start-1 w-full appearance-none rounded bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                {this.filterOptions.map((option, index) => (
                                    <option
                                        key={index}
                                        className="text-gray-900"
                                    >
                                        {option.name}
                                    </option>
                                ))}
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
                                    <EllipsisVerticalIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <button
                                            onClick={this.deleteCompletedTasks}
                                            className="flex w-full justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        >
                                            Remove Completed Tasks
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={this.removeAllTasks}
                                            className="flex w-full justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        >
                                            Remove All Tasks
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={this.checkAllTasks}
                                            className="flex w-full justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        >
                                            Check All
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={this.uncheckAllTasks}
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
                            {this.state.todos.map((todo, index) =>
                                <li
                                    key={todo.id}
                                    className={`flex gap-2 text-gray-700 justify-between rounded p-2 capitalize ${
                                        todo.isEditing ? '' : 'hover:bg-gray-100'
                                    }`}
                                >
                                    <div className="flex gap-2 items-center">
                                        <input
                                            checked={todo.completed}
                                            onChange={() => this.completeTask(todo.id)}
                                            type="checkbox"
                                        />
                                        {!todo.isEditing ? (
                                            <span
                                                className={todo.completed ? "line-through" : ""}
                                                onDoubleClick={() => this.markAsEditing(todo.id)}
                                            >
                                                    {todo.title}
                                            </span>
                                        ) : (
                                            <div className="">
                                                <form
                                                    action={"#"}
                                                    onSubmit={(event) => {
                                                        event.preventDefault();
                                                        this.updateTask(event.target[0].value, todo.id);
                                                    }}
                                                    className="flex gap-2 max-w-md"
                                                >
                                                    <input
                                                        type="text"
                                                        defaultValue={todo.title}
                                                        autoFocus
                                                        className="px-2 py-1"
                                                    />
                                                    <button type="submit">
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            this.cancelEdit(event, todo.id);
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => this.markAsEditing(todo.id)}>
                                            <PencilSquareIcon className="size-5 text-gray-500" aria-hidden="true"/>
                                        </button>
                                        <button onClick={() => this.deleteTask(todo.id)}>
                                            <XMarkIcon className="size-5 text-gray-500" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <p className={this.state.todos.length > 0 ? "hidden" : "text-center text-gray-500"}>
                            No tasks available
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

