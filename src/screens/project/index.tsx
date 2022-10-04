import React from "react";
import { Link, Outlet } from "react-router-dom";

const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务栏</Link>
      <Outlet />
    </div>
  );
};

export default ProjectScreen;
