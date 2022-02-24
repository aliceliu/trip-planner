import {
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import Trip from './Trip';
import Trips from './Trips'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Trips />} />
        <Route path="/trip/*" element={<Trip />} />
      </Routes>
    </>
  );
}

export default App;
