import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import { useState } from 'react';
import Profile from './components/Profile';
import Users from './components/Users';
import MainPage from './components/MainPage';
import Reports from './components/Reports';
import Notifications from './components/Notifications';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState();
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn}/>
        <div className="body">
          <Routes>
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/mainPage' element={<MainPage/>}/>
            <Route path='/myProfile' element={<Profile isMyProfile={true}/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/users/:username' element={<Users/>}/>
            <Route path='/user/:id' element={<Profile isMyProfile={false}/>}/>
            <Route path='/reports' element={<Reports/>}/>
            <Route path='/notification' element={<Notifications/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
