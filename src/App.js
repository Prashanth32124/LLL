import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Love from "./Love";
import Loveajuma from "./Loveajuma";
import LoveLoading from "./LoveLoading";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/love"
          element={
            <ProtectedRoute>
              <Love />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loveloading"
          element={
            <ProtectedRoute>
              <LoveLoading />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loveajuma"
          element={
            <ProtectedRoute>
              <Loveajuma />
            </ProtectedRoute>
          }
        />

        {/* BLOCK UNKNOWN PATHS */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
