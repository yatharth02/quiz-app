import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Rules from './Rules';
import FlipBook from "./FlipBook";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/quiz' element={<FlipBook />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
