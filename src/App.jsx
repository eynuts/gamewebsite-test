import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Teacher from "./Teacher";
import { UserProvider } from "./UserContext"; // ✅ ADD THIS
import TeacherDashboard from "./TeacherDashboard";

function App() {
  return (
    <UserProvider> {/* ✅ Wrap EVERYTHING */}
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Teacher Page */}
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
