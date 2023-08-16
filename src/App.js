import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Rules from "./Rules";
import FlipBook from "./FlipBook";
import McqTeam from "./mcq/McqTeam";
import McqRounds from "./mcq/McqRounds";
import VisualTeam from "./visual/VisualTeam";
import VisualRounds from "./visual/VisualRounds";
import ExtemporeTeam from "./extempore/ExtemporeTeam";
import ExtemporeRounds from "./extempore/ExtemporeRounds";
import VideoTeam from "./video/VideoTeam";
import VideoRounds from "./video/VideoRounds";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/flip_book" element={<FlipBook />} />
        <Route path="/mcq" element={<McqTeam />} />
        <Route path="/mcq_round" element={<McqRounds />} />
        <Route path="/visual" element={<VisualTeam />} />
        <Route path="/visual_round" element={<VisualRounds />} />
        <Route path="/extempore" element={<ExtemporeTeam />} />
        <Route path="/extempore_round" element={<ExtemporeRounds />} />
        <Route path="/video" element={<VideoTeam />} />
        <Route path="/video_round" element={<VideoRounds />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
