import React from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./TaskForm.css";

function TaskForm({ postData, arrayOfTodos }) {
  const [todo, setTodo] = useState();
  return (
    <div className="form-container">
      <form
        className="task-form"
        onSubmit={(e) => {
          postData(todo);
          e.target.reset();
          e.preventDefault();
        }}
      >
        <input
          className="task-form-input"
          placeholder="Name"
          type="text"
          onChange={(e) => {
            // const uuidv4 = require("uuid/v4");
            // uuidv4();
            setTodo({
              ...todo,
              id: uuid(), //error when we have the same id
              name: e.target.value,
            });
          }}
        />
        <input
          className="task-form-input"
          placeholder="Description"
          type="text"
          onChange={(e) => {
            setTodo({ ...todo, description: e.target.value });
          }}
        />

        <button className="task-form-button" type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
