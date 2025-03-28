import './../App.css'
import React, { Component } from 'react'
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/20/solid'

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
                    todos: [...prevState.todos, {
                        id: prevState.todos.length + 1,
                        title: prevState.todo_title,
                        completed: false
                    }]
                }

                this.setItemToLocalStorage(newstate)
                return newstate
            })
        }

        this.markAsEditing = (id) => {
            console.log(id)
            const updatedTodos = this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.isEditing =  true
                }
                return todo
            })


            this.setState(prevState => {
                const newState = {
                    ...prevState,
                    isEditing: true,
                    todos: updatedTodos
                }

                this.setItemToLocalStorage(newState)

                return newState
            })


        }
        this.updateTask = (value, id) => {
            this.setState(prevState => {
                const updatedTodos = prevState.todos.map(todo => {
                    if (todo.id === id) {
                        todo.title = value
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
            {name: "All tasks", action: this.showAllTasks},
            {name: "Completed tasks", action: this.showCompletedTasks},
            {name: "Active tasks", action: this.showNotCompletedTasks}
        ]


    }

    render() {
        return (
            <div>
                <div className="flex flex-col md:mx-auto p-6 md:my-64 md:rounded-2xl shadow-xl h-screen md:max-w-screen-sm md:max-h-max gap-2 bg-white">
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
                                onChange={(event) => this.setState(prev => ({...prev, todo_title: event.target.value}))}
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
                                            onClick={() => this.completeTask(todo.id)}
                                            type="checkbox"
                                        />
                                        {!todo.isEditing ? (
                                            <span
                                                className={ todo.completed ? "line-through" : "" }
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

