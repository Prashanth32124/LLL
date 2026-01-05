import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Love from "./Love";
import Loveajuma from "./Loveajuma";
import LoveLoading from "./LoveLoading";
import ProtectedRoute from "./ProtectedRoute";
import Message from "./Message";
import Chat from "./Chat";
import Devotional from "./Devotional";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌸 PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Devotional />} />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/love"
          element={
            <ProtectedRoute>
              <Love />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
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

        <Route
          path="/message"
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          }
        />

        {/* 🚫 FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
