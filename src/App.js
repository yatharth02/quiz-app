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
import RapidFireTeam from "./rapidfire/RapidFireTeam";
import RapidFireRounds from "./rapidfire/RapidFireRounds";
import BuzzerTeam from "./buzzer/BuzzerTeam";
import BuzzerRounds from "./buzzer/BuzzerRounds";
import FinalResultDisplay from "./FinalResultDisplay";

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
        <Route path="/rapid" element={<RapidFireTeam />} />
        <Route path="/rapid_round" element={<RapidFireRounds />} />
        <Route path="/buzzer" element={<BuzzerTeam />} />
        <Route path="/buzzer_round" element={<BuzzerRounds />} />
        <Route path="/result" element={<FinalResultDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
