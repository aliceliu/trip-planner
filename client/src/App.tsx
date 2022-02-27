import { useEffect, useState } from 'react';
import {
  useNavigate,
  Route,
  Routes,
} from "react-router-dom";

import Dialog from '@mui/material/Dialog';

import './App.css';
import { auth, User } from './firebase';
import { addTrip, getTripFromLocalStorage, deleteTripFromLocalStorage } from './utils/trip';
import Trip from './Trip';
import Trips from './Trips';
import Header from './Header';
import Auth from './Auth'

function App() {

  const navigate = useNavigate();
  const pendingTrip = getTripFromLocalStorage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      setUser(user);
      setLoading(false);
    });
  }, [])

  function showLogin() {
    setOpenLogin(true);
  }

  function onSignIn(authResult: any, redirectUrl: any) {
    setOpenLogin(false);
    const user = authResult.user;
    if (user) {
      if (pendingTrip) {
        addTrip(user.uid, pendingTrip)
          .then(trip => {
            deleteTripFromLocalStorage();
            navigate(`/trip/${trip.id}`)
          })
          .catch(console.error);
      }
    }
    return false;
  }

  function logout() {
    auth.signOut().then(function () {
      navigate('/');
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <Header user={user} onLoginClicked={showLogin} onLogoutClicked={logout} />
      {!loading && <Routes>
        <Route path="/" element={user && !pendingTrip ? <Trips user={user} /> : <Trip user={user} showLogin={showLogin} />} />
        <Route path="/trip/*" element={<Trip user={user} showLogin={showLogin} />} />
      </Routes>}
      <Dialog onClose={() => setOpenLogin(false)} open={openLogin}>
        <Auth onSignIn={onSignIn}></Auth>
      </Dialog>
    </>
  );
}

export default App;
