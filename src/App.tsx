import React, { useState } from "react";
import { Navbar } from "./components/Navbar";

interface Task {
  id: number;
  text: string;
  isEditing: boolean;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const newItem: Task = {
      id: Date.now(),
      text: newTask.trim(),
      isEditing: false,
      completed: false,
    };
    setTasks([...tasks, newItem]);
    setNewTask("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditToggle = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const handleEditChange = (id: number, value: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: value } : task))
    );
  };

  const handleSaveEdit = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task
      )
    );
  };

  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <Navbar />
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-primary">
           To-Do List
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            className="input input-bordered flex-grow"
          />
          <button onClick={handleAddTask} className="btn btn-primary">
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-colors ${
                task.completed ? "bg-green-100" : "bg-base-100"
              }`}
            >
              {task.isEditing ? (
                <>
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => handleEditChange(task.id, e.target.value)}
                    className="input input-sm flex-grow"
                  />
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className="btn btn-success btn-sm ml-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`flex-grow ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditToggle(task.id)}
                      className="btn btn-sm btn-outline btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className={`btn btn-sm ${
                        task.completed
                          ? "btn-outline btn-warning"
                          : "btn-success"
                      }`}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
