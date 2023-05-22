import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Login.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, isLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    }, [])

    const login = async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
          const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
            username: username,
            password: password
          });
          console.log(response.data);
          setIsLoggedIn(true);
          localStorage.setItem('token', response.data.token)
          navigate('/mainPage');
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      };

    return (
        <div className="container">
        <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="username" id="username" name="username" required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required/>
          </div>
          <button type="submit" className="btn" onClick={() => login()}>Login</button>
      </div>
    );
}

export default Login;