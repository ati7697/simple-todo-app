import './../App.css'
import { useState } from "react";
// import AnotherFile from "./anotherFile";

function App() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(preCount => preCount += 1);
  const decrement = () => setCount(preCount => preCount -= 1);

  const [todos, setTodos] = useState([
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
    }
  ]);

    const [newTask, setNewTask] = useState("");

  return (
    <div className="App">
    </div>
  );
}

export default App;
