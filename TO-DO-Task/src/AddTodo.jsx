import React from "react";

function AddTodo({ todos, edittask, deletetodo, change }) {
  return (
    <div>
      {todos.map((todo) => (
        <div className="cards" key={todo.id}>
          <div className="details">
            <h3>Task Name : {todo.name}</h3>
            <p>Task Description : {todo.description}</p>
            <p>
              Status:
              <select
                name="status"
                id="todostatus"
                key={todo.id}
                onChange={(e) => change(todo.id)}
              >
                <option className="notcompleted" value={todo.completed}>
                  Not Completed
                </option>
                <option className="completed" value={todo.completed}>
                  Completed
                </option>
              </select>
            </p>
            <div className="btn">
              <button className="editbtn" onClick={() => edittask(todo.id)}>
                Edit
              </button>
              <button
                className="deletebtn"
                onClick={() => {
                  deletetodo(todo.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddTodo;
