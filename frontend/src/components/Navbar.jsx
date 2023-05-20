import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <div className="navbar-left">
                {/* {isLoggedIn && <Link to={'/mainPage'}><button className="navbar-btn">Main page</button></Link>}
                {isLoggedIn && <Link to={'/myProfile'}><button className="navbar-btn">My profile</button></Link>}
                {isLoggedIn && <Link to={'/users'}><button className="navbar-btn">Users</button></Link>} */}
                <Link to={'/mainPage'}><button className="navbar-btn">Main page</button></Link>
                <Link to={'/myProfile'}><button className="navbar-btn">My profile</button></Link>
                <Link to={'/users'}><button className="navbar-btn">Users</button></Link>
                <Link to={'/reports'}><button className="navbar-btn">Reports</button></Link>
            </div>
            <div className="navbar-right">
                <img src="./notification.png" alt="Notification" width="20" height="20" onClick={() => navigate('/notification')}/>

                {!isLoggedIn && <Link to={'/login'}><button className="navbar-btn">Login</button></Link>}
                {!isLoggedIn && <Link to={'/register'}><button className="navbar-btn">Register</button></Link>}
                {isLoggedIn && <Link to={'/login'}><button className="navbar-btn">Logout</button></Link>}
            </div>
        </div>
    );
}

export default Navbar;