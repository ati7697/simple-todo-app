import React, { Component } from 'react'
import BreadCrumbs from "./BreadCrumbs";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";

export default class Flashcard extends Component {
    constructor(props) {
        super(props);
        const savedWords = JSON.parse(localStorage.getItem('flashcard_words')) || [];
        this.state = {
            words: savedWords,
            newWord: '',
            currentIndex: savedWords.length ? 0 : 0,
        };

        this.submitNewWord = (event) => {
            event.preventDefault();
            this.setState(prevState => {
                const newWords = [...prevState.words, prevState.newWord];
                localStorage.setItem('flashcard_words', JSON.stringify(newWords));
                return {
                    words: newWords,
                    newWord: '',
                    currentIndex: newWords.length - 1, // show the newly added word
                };
            });
        }

        this.showNextWord = () => {
            this.setState(prev => {
                const len = prev.words.length;
                if (len === 0) return null;
                return { currentIndex: (prev.currentIndex + 1) % len };
            });
        }

        this.showPrevWord = () => {
            this.setState(prev => {
                const len = prev.words.length;
                if (len === 0) return null;
                return { currentIndex: (prev.currentIndex - 1 + len) % len };
            });
        }
    }

    render() {
        const { words, currentIndex } = this.state;
        const currentWord = words.length ? words[currentIndex] : null;

        return (
            <div>
                <BreadCrumbs/>
                <div className="flex flex-col md:mx-auto p-6 md:my-64 md:rounded-2xl shadow-xl h-screen md:max-w-screen-sm md:max-h-max gap-2 bg-white">
                    <h1 className="text-2xl font-bold mb-4">Flashcard</h1>
                    <form
                        action={"#"}
                        onSubmit={this.submitNewWord}
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
                                placeholder="Enter your word"
                                value={this.state.newWord}
                                onChange={(event) => this.setState(prev => ({...prev, newWord: event.target.value}))}
                                autoComplete="off"
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

                    <div className="overflow-hidden bg-gray-50 h-40 border shadow-sm sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6 flex justify-center items-center h-full">
                            {currentWord ? (
                                <h3 className="text-2xl font-medium text-center text-gray-900">{currentWord}</h3>
                            ) : (
                                <h3 className="text-lg text-center text-gray-500">No words yet — add one above</h3>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between mt-4">
                        <ArrowLeftIcon
                            className={`size-6 text-gray-500 hover:text-gray-900 cursor-pointer ${words.length === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                            onClick={() => this.showPrevWord()}
                        />
                        <span>
                            {words.length > 0 ? `${currentIndex + 1} / ${words.length}` : '0 / 0'}
                        </span>
                        <ArrowRightIcon
                            className={`size-6 text-gray-500 hover:text-gray-900 cursor-pointer ${words.length === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                            onClick={() => this.showNextWord()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
