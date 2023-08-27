import { useState } from "react";

import "./App.css";
import Completed from "./Completed";
import Notcompleted from "./Notcompleted";
import All from "./All";
import AddTodo from "./AddTodo";

function App() {
  const [todoname, SetTodoName] = useState("");
  const [tododescription, SetTodoDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editid, setEditid] = useState(0);
  const [all, setAll] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [notcompleted, setnotcompleted] = useState([]);
  const [status, setStatus] = useState(1);

  const handlesubmit = (e) => {
    console.log("submit");
    e.preventDefault();

    const newobj = {
      id: new Date().getTime(),
      name: todoname,
      description: tododescription,
      completed: false,
    };
    if (editid) {
      const edittask = todos.find((todo) => todo.id === editid);
      const updatedtodo = todos.map(
        (todo) =>
          todo.id === edittask.id &&
          (todo = {
            id: todo.id,
            name: todoname,
            description: tododescription,
          })
      );
      console.log(updatedtodo);
      setTodos(updatedtodo);

      setEditid(0);
      SetTodoName("");
      SetTodoDescription("");

      return;
    }
    setTodos([...todos].concat(newobj));
    console.log(todos);
    SetTodoName("");
    SetTodoDescription("");
    setStatus(0);
  };
  function deletetodo(id) {
    const updatedtodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedtodos);
  }
  function change(id) {
    let updated = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updated);
    console.log("change componenet");
  }
  function edittask(id) {
    const edit = todos.find((todos) => todos.id === id);
    SetTodoName(edit.name);
    SetTodoDescription(edit.description);
    setEditid(edit.id);
  }
  function filter(e) {
    if (e.target.value === "true") {
      const updated = todos.filter((todo) => todo.completed === true);
      setCompleted(updated);
      setStatus(1);

      setStatus(true);
    } else if (e.target.value == "false") {
      const updated = todos.filter((todo) => todo.completed === false);
      setnotcompleted(updated);

      setStatus(2);
      setStatus(false);
      console.log(setStatus);
    } else {
      setAll(todos);
      setStatus(3);
    }
  }

  return (
    <>
      <h1 className="header">My TODO LIST</h1>
      <form onSubmit={handlesubmit} className="form">
        <div className="inputfield">
          <input
            type="text"
            placeholder="   Enter TODO name"
            value={todoname}
            onChange={(e) => {
              SetTodoName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="   Enter TODO Description"
            value={tododescription}
            onChange={(e) => SetTodoDescription(e.target.value)}
          />
          <button type="submit" className="addbutton" onClick={handlesubmit}>
            Add ToDo
          </button>
        </div>
      </form>
      <h1 className="todobelowheader">My TODO's</h1>
      <div className="status">
        <h3>Status Filter : </h3>
        <select
          className="status-filter"
          onChange={(e) => {
            filter(e);
          }}
        >
          <option value={all}>All</option>
          <option value={true}>Completed</option>
          <option value={false}>NotCompleted</option>
        </select>
      </div>
      {status == 0 ? (
        <div>
          <AddTodo
            todos={todos}
            edittask={edittask}
            deletetodo={deletetodo}
            change={change}
          />
        </div>
      ) : status == 1 ? (
        <div>
          {" "}
          <Completed
            todos={completed}
            edittask={edittask}
            deletetodo={deletetodo}
            change={change}
          />
          {setCompleted([])}
        </div>
      ) : status == 2 ? (
        <div>
          <Notcompleted
            todos={notcompleted}
            edittask={edittask}
            deletetodo={deletetodo}
            change={change}
          />
          {setnotcompleted([])}
        </div>
      ) : (
        <div>
          <All
            todos={todos}
            edittask={edittask}
            deletetodo={deletetodo}
            change={change}
          />
        </div>
      )}
    </>
  );
}

export default App;
