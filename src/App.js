import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Rules from "./Rules";
import FlipBook from "./FlipBook";
import McqTeam from "./mcq/McqTeam";
import McqRounds from "./mcq/McqRounds";
import VisualTeam from "./visual/VisualTeam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/quiz" element={<FlipBook />} />
        <Route path="/mcq" element={<McqTeam />} />
        <Route path="/mcq_round" element={<McqRounds />} />
        <Route path="/visual" element={<VisualTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
