import {
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import Trip from './Trip';

function App() {
  return (
    <>
      <Routes>
        <Route path="/trip/*" element={<Trip />}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
