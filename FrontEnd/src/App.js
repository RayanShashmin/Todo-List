import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Todo';

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/get-todo")
      .then((res) => {
        const todos = res.data.filter(todo => !todo.completed);
        const completed = res.data.filter(todo => todo.completed);
        setTodos(todos);
        setCompletedTodos(completed);
      })
      .catch((err) => console.log(err))
  }, []);

  const add = () => {
    if (text === "") {
      alert("Please write a ToDo before submitting..");
    } else if (text !== "" && isUpdating === "") {
      axios.post("http://localhost:8080/save-todo", { text })
        .then((res) => {
          setTodos([...todos, res.data]);
          setText("");
        })
        .catch((err) => console.log(err))
    } else {
      axios.post("http://localhost:8080/update-todo", { _id: isUpdating, text })
        .then((res) => {
          const updatedTodos = todos.map(todo =>
            todo._id === isUpdating ? { ...todo, text } : todo
          );
          setTodos(updatedTodos);
          setText("");
          setIsUpdating("");
        })
        .catch((err) => console.log(err))
    }
  }

  const deleteToDo = (_id) => {
    axios.post("http://localhost:8080/delete-todo", { _id })
      .then((res) => {
        setTodos(todos.filter(todo => todo._id !== _id));
        setCompletedTodos(completedTodos.filter(todo => todo._id !== _id));
      })
      .catch((err) => console.log(err))
  }

  const updateToDo = (_id, text) => {
    setIsUpdating(_id);
    setText(text);
  }

  const toggleComplete = (_id) => {
    const todoToToggle = todos.find(todo => todo._id === _id);
    axios.post("http://localhost:8080/update-todo", { _id, completed: !todoToToggle.completed })
      .then((res) => {
        if (todoToToggle.completed) {
          // Move from completed to todos
          setCompletedTodos(completedTodos.filter(todo => todo._id !== _id));
          setTodos([...todos, { ...todoToToggle, completed: false }]);
        } else {
          // Move from todos to completed
          setTodos(todos.filter(todo => todo._id !== _id));
          setCompletedTodos([...completedTodos, { ...todoToToggle, completed: true }]);
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='App'>
      <div className='container'>
        <h1>Place Your ToDo's Here....</h1>
        <div className='top'>
          <input type="text" required="required" placeholder='Write here before it forgets...' value={text} onChange={(e) => setText(e.target.value)}></input>
          <button className='btn btn-outline-success' onClick={add}>{isUpdating ? "Update" : "Add To-Do"}</button>
        </div>
        <div>
          <h2>To Do</h2>
          <ul className='list-group list-group-flush'>
            {todos.map(todo => (
              <li className="list-group-item" key={todo._id}>
                <Todo
                  text={todo.text}
                  completed={todo.completed}
                  toggleComplete={() => toggleComplete(todo._id)}
                  remove={() => deleteToDo(todo._id)}
                  update={() => updateToDo(todo._id, todo.text)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Completed</h2>
          <ul className='list-group list-group-flush'>
            {completedTodos.map(todo => (
              <li className="list-group-item" key={todo._id}>
                <Todo
                  text={todo.text}
                  completed={todo.completed}
                  toggleComplete={() => toggleComplete(todo._id)}
                  remove={() => deleteToDo(todo._id)}
                  update={() => updateToDo(todo._id, todo.text)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
