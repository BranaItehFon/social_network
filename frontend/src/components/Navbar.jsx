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
                setIsAdmin(user?.role==='ADMIN')
                console.log(user)
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        }
        
        getUser();
        
      }, [isLoggedIn]);
      console.log(user)
    return (
        <div className="navbar">
            <div className="navbar-left">
                {/* {isLoggedIn && <Link to={'/mainPage'}><button className="navbar-btn">Main page</button></Link>}
                {isLoggedIn && <Link to={'/myProfile'}><button className="navbar-btn">My profile</button></Link>}
                {isLoggedIn && <Link to={'/users'}><button className="navbar-btn">Users</button></Link>} */}
                {isLoggedIn && <Link to={'/mainPage'}><button className="navbar-btn">Main page</button></Link>}
                {!isAdmin && isLoggedIn && <Link to={'/user/'+user?.id}><button className="navbar-btn">My profile</button></Link>}
                {isLoggedIn && <Link to={'/users'}><button className="navbar-btn">Users</button></Link>}
                {isLoggedIn && isAdmin && <Link to={'/reports'}><button className="navbar-btn">Reports</button></Link>}
                {isAdmin && isLoggedIn && <Link to={'/analitika'}><button className="navbar-btn">Activity</button></Link>}
            </div>
            <div className="navbar-right">
            {/* {user?.role === 'USER'  && <Link to={'/notification'}><button className="navbar-btn" style={{ backgroundColor:'red' }}>Notifications</button></Link>} */}
            {isLoggedIn && !isAdmin  && <Link to={'/notification'}><button className="navbar-btn">Notifications</button></Link>}

                {!isLoggedIn && <Link to={'/login'}><button className="navbar-btn">Login</button></Link>}
                {!isLoggedIn && <Link to={'/register'}><button className="navbar-btn">Register</button></Link>}
                {isLoggedIn && <Link to={'/login'}><button className="navbar-btn">Logout</button></Link>}
            </div>
        </div>
    );
}

export default Navbar;