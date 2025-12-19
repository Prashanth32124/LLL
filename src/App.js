import logo from './logo.svg';
import Love from './Love.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loveajuma from './Loveajuma.jsx';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Love />} />
          <Route path="/loveajuma" element={<Loveajuma />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
