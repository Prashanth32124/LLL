import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Love from "./Love";
import Loveajuma from "./Loveajuma";
import LoveLoading from "./LoveLoading";
function App() {
  return (
    <Router>
      <Routes>
        {/* FORCE ROOT */}
        <Route path="/" element={<Love />} />

        {/* OPTIONAL: redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/loveajuma" element={<Loveajuma />} />
        <Route path="/loveloading" element={<LoveLoading />} />
      </Routes>
    </Router>
  );
}

export default App;
