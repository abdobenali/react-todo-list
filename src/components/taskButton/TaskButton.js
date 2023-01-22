import React, { useEffect, useState } from "react";
import "./TaskButton.css";

function Button({ todo, idOfDisplayedTodo, onTaskClick }) {
  const [disable, setDisable] = useState();
  useEffect(() => {
    if (idOfDisplayedTodo === todo.id) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [idOfDisplayedTodo, todo]);
  return (
    <div className="task-button-container">
      <button
        className="task-button"
        onClick={() => {
          onTaskClick(todo.id);
        }}
        disabled={disable}
      >
        {todo.name}
      </button>
    </div>
  );
}

export default Button;
