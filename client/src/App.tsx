import {
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import Trip from './Trip';
import Trips from './Trips'
import Header from './Header'

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Trips />} />
        <Route path="/trip/*" element={<Trip />} />
      </Routes>
    </>
  );
}

export default App;
