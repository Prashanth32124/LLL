import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Love from "./Love";
import Loveajuma from "./Loveajuma";
import LoveLoading from "./LoveLoading";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN */}
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

        {/* BLOCK UNKNOWN */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
