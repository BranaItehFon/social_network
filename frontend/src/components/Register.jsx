import { useNavigate } from 'react-router-dom';
import './css/Register.css';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const register = async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const gender = document.getElementById('gender').value;
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
                email: email,
                gender: gender,
            });
            console.log(response.data)
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };
    return (
        <div className="container">
            <h2>Sign Up</h2>
            <div className="form-group">
                <label htmlFor="firstname">First name:</label>
                <input type="text" id="firstname" name="firstname" required />
            </div>
            <div className="form-group">
                <label htmlFor="lastname">Last name:</label>
                <input type="text" id="lastname" name="lastname" required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender"  style={{ marginLeft: '15%', width: '300px', height: '40px'}}>
                    <option value="">Select</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </select>
            </div>
            <button type="submit" className="btn" onClick={() => register()}>Sign Up</button>
        </div>
    );
}

export default Register;