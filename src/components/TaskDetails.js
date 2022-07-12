import React from "react";

const TaskDetails = ({ task }) => {
  return (
    <div>
      <h4>{task.text}</h4>
      <p>{task.day}</p>
      <div className={`badge ${task.reminder ? "success" : "error"}`}>
        {task.reminder ? "Reminder is on" : "Reminder is off"}
      </div>
    </div>
  );
};

export default TaskDetails;
