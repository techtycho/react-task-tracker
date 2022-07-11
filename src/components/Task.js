import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
      <Link
        to={`/tasks/${task.id}`}
        style={{ display: "inline-block", marginTop: "5px" }}
      >
        View Details
      </Link>
    </div>
  );
};

export default Task;
