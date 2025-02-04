// src/App.jsx
import React, { useState } from "react";
import TodoForm from "./components/TodoForm.tsx";
import { Todo } from "./Types";
import TodoList from "./components/TodoList.tsx";
import "./index.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const handleEditTodo = (updatedTodo: Todo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleRemoveTask = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleCheckBox = (id: number) => {
    // Find the todo by ID and toggle the isCompleted state
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <>
      <div>
        <TodoForm addTodo={handleAddTodo} />;
        <TodoList
          Todos={todos}
          editTask={handleEditTodo}
          removeTask={handleRemoveTask}
          getId={handleCheckBox}
        />
        ;
      </div>
    </>
  );
}

export default App;
