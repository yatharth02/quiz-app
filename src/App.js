import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Home';
import Rules from './Rules';
import Quiz from './Quiz';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/quiz' element={<Quiz />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
