import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isLoggedIn, notifications }) => {
    const [user, setUser] = useState();
    const [isAdmin, setIsAdmin] = useState();
    useEffect(() => {

        const getUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users/currentlyLoggedIn', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data)
                setIsAdmin(response.data.role === 'ADMIN')
                console.log(user)
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        }
        if (isLoggedIn) {
            getUser();
        }

    }, [isLoggedIn]);
    const [weather, setWeather] = useState('');
    const [location, setLocation] = useState('London');

    const apiKey = '2d87539fd120faf52522d5a6f7c24bea';
    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                    params: {
                        q: location,
                        appid: apiKey,
                    },
                });

                setWeather(response.data); 
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
            }
        };

        getWeatherData();

    }, [location])
    console.log(weather)
    return (
        <div className="navbar">
          <div className="navbar-left">
            {isLoggedIn && <Link to="/mainPage"><button className="navbar-btn">Main page</button></Link>}
            {!isAdmin && (isLoggedIn || isLoggedIn === undefined) && <Link to={`/user/${user?.id}`}><button className="navbar-btn">My profile</button></Link>}
            {(isLoggedIn || isLoggedIn === undefined) && <Link to="/users"><button className="navbar-btn">Users</button></Link>}
            {(isLoggedIn || isLoggedIn === undefined) && isAdmin && <Link to="/reports"><button className="navbar-btn">Reports</button></Link>}
          </div>
          <div className="middle">
            <div className="select-container">
              <select id="gender" name="gender" onChange={(e) => setLocation(e.target.value)}>
              <option value="Belgrade">Belgrade</option>
                <option value="London">London</option>
                <option value="New York">New York</option>
              </select>
            </div>
            <div>
               Temp: {weather?.main.temp} F
              Description: {weather?.weather[0].description} 
            </div>
          </div>
          <div className="navbar-right">
            {isLoggedIn && !isAdmin && <Link to="/notification"><button className="navbar-btn">Notifications</button></Link>}
            {!isLoggedIn && <Link to="/login"><button className="navbar-btn">Login</button></Link>}
            {!isLoggedIn && <Link to="/register"><button className="navbar-btn">Register</button></Link>}
            {isLoggedIn && <Link to="/login"><button className="navbar-btn">Logout</button></Link>}
          </div>
        </div>
      );
      
}

export default Navbar;