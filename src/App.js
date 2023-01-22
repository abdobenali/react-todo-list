import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import TaskButton from "./components/taskButton/TaskButton";
import SwitchButton from "./components/switchButton/SwitchButton";
import TaskForm from "./components/taskForm/TaskForm";

function App() {
  const [arrayOfTodos, setArrayOfTodos] = useState();
  const [idOfDisplayedTodo, setIdOfDisplayedTodo] = useState();

  const postData = async (newTodo) => {
    await fetch(`http://localhost:8000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => {
        return res.json();
      })
      .then((newElement) => {
        setArrayOfTodos([...arrayOfTodos, newElement]);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  const getData = async () => {
    await fetch("http://localhost:8000/todos")
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setArrayOfTodos(arr);
        setIdOfDisplayedTodo(arr[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteData = async (id) => {
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const newArray = arrayOfTodos.filter((todo) => todo.id !== id);
        setArrayOfTodos(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleTaskClick = (todoID) => {
    const found = arrayOfTodos.find((todo) => todo.id === todoID);
    setIdOfDisplayedTodo(found.id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app-container">
      {/* form */}
      <h1>React-Todo-List</h1>
      <TaskForm postData={postData} arrayOfTodos={arrayOfTodos} />
      <div className="task-container">
        <div className="task-buttons-container">
          {/* buttons */}
          {arrayOfTodos &&
            arrayOfTodos.map((todo) => {
              return (
                <TaskButton
                  key={todo.id}
                  onTaskClick={handleTaskClick}
                  todo={todo}
                  idOfDisplayedTodo={idOfDisplayedTodo}
                />
              );
            })}
        </div>
        {/* desc of each todo */}
        <div className="task-description-container">
          {arrayOfTodos && (
            <div className="task-description-under-container">
              <p>
                {
                  arrayOfTodos.find((todo) => todo.id === idOfDisplayedTodo)
                    .description
                }
              </p>
              <button
                className="task-complete-button"
                onClick={(e) => {
                  setIdOfDisplayedTodo(
                    arrayOfTodos.filter(
                      (todo) => todo.id !== idOfDisplayedTodo
                    )[0].id
                  );
                  deleteData(idOfDisplayedTodo);
                  e.preventDefault();
                }}
              >
                Complete
              </button>
            </div>
          )}
        </div>
        {/* buttons */}
        <div className="task-switch-buttons-container">
          {arrayOfTodos &&
            arrayOfTodos.map((todo) => {
              return (
                <SwitchButton
                  key={todo.id}
                  onTaskClick={handleTaskClick}
                  todo={todo}
                  idOfDisplayedTodo={idOfDisplayedTodo}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
