import React, { useEffect, useState } from "react";
import "./SwitchButton.css";

function SwitchButton({ todo, idOfDisplayedTodo, onTaskClick }) {
  const [disable, setDisable] = useState();
  useEffect(() => {
    if (idOfDisplayedTodo === todo.id) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [idOfDisplayedTodo, todo]);
  return (
    <div className="switch-button-container">
      <button
        className={disable ? "switch-button-disabled" : "switch-button"}
        onClick={() => {
          onTaskClick(todo.id);
        }}
        disabled={disable}
      ></button>
    </div>
  );
}

export default SwitchButton;
