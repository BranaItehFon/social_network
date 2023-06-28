import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import Profile from './components/Profile';
import Users from './components/Users';
import MainPage from './components/MainPage';
import Reports from './components/Reports';
import Notifications from './components/Notifications';
import Activity from './components/Activity';
import axios from 'axios';
import Notification from './components/Notification';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    if(localStorage.getItem('token') != null) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, localStorage.getItem('token'))

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn}/>
        <div className="body">
          <Routes>
          <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}/>
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/mainPage' element={<MainPage/>}/>
            {/* <Route path='/myProfile' element={<Profile isMyProfile={true}/>}/> */}
            <Route path='/users' element={<Users/>}/>
            <Route path='/users/:username' element={<Users/>}/>
            <Route path='/user/:id' element={<Profile/>}/>
            <Route path='/reports' element={<Reports/>}/>
            <Route path='/notification' element={<Notifications/>}/>
            <Route path='/notification/notification/:id' element={<Notification/>}/>
            <Route path='/analitika' element={<Activity/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
