
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API = "https://project-task-management-api-sen8.onrender.com/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API);
      setTasks(response.data);
      setError("");
    } catch (err) {
      setError("Cannot connect to backend. Check the server.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task name.");
      return;
    }

    try {
      await axios.post(API, { title: title.trim() });
      setTitle("");
      fetchTasks();
    } catch (err) {
      setError("Could not add task.");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/${id}`, { status });
      fetchTasks();
    } catch (err) {
      setError("Could not update status.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Could not delete task.");
    }
  };

  const statuses = ["Pending", "InProgress", "Completed"];

  return (
    <div className="container py-5">
      <h1 className="text-center">Project Task Management</h1>
      <p className="text-center text-muted mb-4">
        Manage your project tasks
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="input-group mb-4" onSubmit={addTask}>
        <input
          className="form-control"
          placeholder="Enter task name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add Task
        </button>
      </form>

      <div className="row">
        {statuses.map((status) => {
          const filtered = tasks.filter((task) => task.status === status);

          return (
            <div className="col-md-4 mb-3" key={status}>
              <div className="card shadow-sm h-100">
                <div className="card-header bg-primary text-white">
                  <h5>{status}</h5>
                  <small>{filtered.length} task(s)</small>
                </div>

                <div className="card-body">
                  {filtered.length === 0 && (
                    <p className="text-muted">No tasks available.</p>
                  )}

                  {filtered.map((task) => (
                    <div className="task-card p-3 mb-3" key={task._id}>
                      <h6>{task.title}</h6>

                      <select
                        className="form-select mb-2"
                        value={task.status}
                        onChange={(e) =>
                          updateStatus(task._id, e.target.value)
                        }
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
