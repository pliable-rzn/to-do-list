import React, { useState } from "react";
import { Todo } from "../Types";

interface Props {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [id, setId] = useState<number>(1);
  const [text, setText] = useState<string>("");
  const [isCompleted, setisCompleted] = useState<boolean>(false);

  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (text) {
      const newTodo: Todo = { id, text, isCompleted };
      addTodo(newTodo);
      setId(id + 1);
      setText("");
      setisCompleted(false);
    } else {
      alert("Please fill out the fields");
    }
  };
  return (
    <div className="bg-white flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmitTask}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
            className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
