import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import VerifyEmail from "./pages/VerifyEmail"
import Projects from "./pages/Projects"
import ProjectDetails from "./pages/ProjectDetails"
import KanbanBoard from "./pages/KanbanBoard"
import TaskDetails from "./pages/TaskDetails"
import TeamMembers from "./pages/TeamMembers"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/projects/:projectId/board" element={<KanbanBoard />} />
        <Route path="/projects/:projectId/tasks/:taskId" element={<TaskDetails />} />
        <Route path="/team-members" element={<TeamMembers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
 