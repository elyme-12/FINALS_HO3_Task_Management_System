import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

const API_URL = import.meta.env.VITE_API_URL;

  // GET TASKS
  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks/`);
    const data = await res.json();
    setTasks(data);
  };

  // ADD TASK
  const addTask = async () => {
    if (!title) return;

    await fetch(`${API_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        is_completed: false,
      }),
    });

    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1 className="title">TASK MANAGEMENT SYSTEM</h1>

      <div className="input-section">
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />

        <button className="button" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span> 📌 {task.title}</span>
          
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
