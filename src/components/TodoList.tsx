import { useState } from "react";
import { Todo } from "../Types";
import { TrashIcon } from "@heroicons/react/24/solid";

interface TodoListProps {
  Todos: Todo[];
  editTask: (todo: Todo) => void;
  removeTask: (id: number) => void;
  getId: (id: number, isCompleted: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  Todos,
  editTask,
  removeTask,
  getId,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isCompleted, setisCompleted] = useState(false);

  const handleEditClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTodo) {
      editTask(selectedTodo);
      setSelectedTodo(null);
    }
  };

  const handleDeleteBtn = (id: number) => {
    removeTask(id);
  };

  const handleCheckBox = (id: number, isCompleted: boolean) => {
    // Update the completion status in the parent component
    getId(id, isCompleted);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const checked = e.target.checked;

    if (checked) {
      // Prompt the user when marking as completed
      const confirm = window.confirm(
        "Are you sure you want to set this task as completed?"
      );
      if (confirm) {
        // If confirmed, mark the task as completed
        handleCheckBox(id, true);
      } else {
        // If the user cancels, revert the checkbox state
        e.target.checked = false;
      }
    } else {
      // If unchecked, immediately mark the task as incomplete
      handleCheckBox(id, false);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Todo List
        </h1>

        {/* Todo list display */}
        <ul className="space-y-4">
          {Todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm"
            >
              <input
                type="checkbox"
                checked={todo.isCompleted} // assuming "completed" is a property of the todo
                onChange={(e) => {
                  handleCheckboxChange(e, todo.id);
                }}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span
                className={`text-lg ${
                  todo.isCompleted ? "text-green-500" : "text-gray-700"
                }`}
              >
                {todo.text}
              </span>
              <div className="space-x-3">
                <button
                  onClick={() => handleEditClick(todo)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBtn(todo.id)}
                  className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Edit Todo Form */}
        {selectedTodo && (
          <form onSubmit={handleFormSubmit} className="mt-6">
            <div className="mb-4">
              <label
                className="block text-sm text-gray-600 mb-2"
                htmlFor="text"
              >
                Edit text
              </label>
              <input
                type="text"
                id="text"
                value={selectedTodo.text}
                onChange={(e) =>
                  setSelectedTodo({ ...selectedTodo, text: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TodoList;
