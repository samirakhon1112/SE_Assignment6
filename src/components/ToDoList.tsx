import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  // Add task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const newItem: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, newItem]);
    setNewTask("");
  };

  // Delete task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit task
  const editTask = (id: number, text: string) => {
    setEditingTaskId(id);
    setEditedText(text);
  };

  // Save edited task
  const saveEditedTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editedText } : task
      )
    );
    setEditingTaskId(null);
    setEditedText("");
  };

  // Mark as completed
  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        To-Do List
      </h2>

      {/* Add new task */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Task list */}
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center px-3 py-2 rounded-md transition-colors ${
              task.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="flex-grow border border-gray-300 rounded-md px-2 py-1 mr-2"
              />
            ) : (
              <span
                className={`flex-grow ${
                  task.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {task.text}
              </span>
            )}

            <div className="flex gap-2">
              {editingTaskId === task.id ? (
                <button
                  onClick={() => saveEditedTask(task.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded-md text-sm hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => editTask(task.id, task.text)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded-md text-sm hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`${
                      task.completed
                        ? "bg-gray-400 hover:bg-gray-500"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white px-2 py-1 rounded-md text-sm`}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

