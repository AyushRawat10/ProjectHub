import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import KanbanBoard from "./pages/KanbanBoard";
import TaskDetails from "./pages/TaskDetails";
import MyTasks from "./pages/MyTasks";

import TeamMembers from "./pages/TeamMembers";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/projects" 
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/projects/:projectId" 
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/projects/:projectId/board" 
          element={
            <ProtectedRoute>
              <KanbanBoard />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/projects/:projectId/tasks/:taskId"
          element={
            <ProtectedRoute>
              <TaskDetails />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/team-members" 
          element={
            <ProtectedRoute>
              <TeamMembers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
