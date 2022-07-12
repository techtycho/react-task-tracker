import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(true);

  const checkServer = () => {
    return new Promise((resolve) => {
      fetch("http://localhost:5000/tasks")
        .then(() => setError(false))
        .catch(() => setError(true))
        .finally(() => resolve());
    });
  };

  useEffect(() => {
    checkServer();
  });

  useEffect(() => {
    const getTasks = async () => {
      if (!error) {
        const data = await fetchTasks();
        setTasks(data);
      }
    };

    getTasks();
  }, [error]);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Show AddTask
  const showForm = () => {
    setShowAddTask(!showAddTask);
  };

  // Add Task
  const addTask = (task) => {
    const add = async () => {
      const res = await fetch(`http://localhost:5000/tasks`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();
      setTasks([...tasks, data]);
    };

    checkServer().then(() => {
      if (!error) {
        setShowAddTask(false);
        setTasks([]);

        setTimeout(() => {
          alert("Server disconnected");
        }, 100);
      } else {
        add();
      }
    });
  };

  // Delete Task
  const deleteTask = (id) => {
    checkServer().then(() => {
      if (!error) {
        setShowAddTask(false);
        setTasks([]);

        setTimeout(() => {
          alert("Server disconnected");
        }, 100);
      } else {
        del();
      }
    });

    const del = async () => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== id));
    };
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    checkServer().then(() => {
      if (!error) {
        setShowAddTask(false);
        setTasks([]);

        setTimeout(() => {
          alert("Server disconnected");
        }, 100);
      } else {
        toggle();
      }
    });

    const toggle = async () => {
      const taskToToggle = await fetchTask(id);
      const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await res.json();

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: data.reminder } : task
        )
      );
    };
  };

  return (
    <Router>
      <div className="container">
        <Header onShowForm={showForm} showAddTask={showAddTask} error={error} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  `${
                    error ? "Cannot connect to the server" : "No Tasks to show"
                  }`
                )}
              </>
            }
          />
          {tasks.map((task) => (
            <Route
              key={task.id}
              path={`/tasks/${task.id}`}
              element={<TaskDetails task={task} />}
            />
          ))}
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
