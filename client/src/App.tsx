import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import Trip from './Trip';
import Trips from './Trips';
import Header from './Header';
import { auth, User } from './firebase';

function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      setUser(user);
      console.log(user);
    });
  }, [])

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={user ? <Trips /> : <Trip user={user} />} />
        <Route path="/trip/*" element={<Trip user={user} />} />
      </Routes>
    </>
  );
}

export default App;
