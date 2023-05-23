import { useState, useEffect } from "react";
import axios from "axios";
import './css/Users.css';
import { useNavigate, useParams } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const { username } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [isAdmin, setIsAdmin] = useState();

    useEffect(() => {

        const getUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users/currentlyLoggedIn', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setIsAdmin(response.data.role === 'ADMIN')
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        }
        getUser();

    }, []);

    const getUsersByUsername = async (username) => {
        if(username!=''){
        try {
            const response = await axios.get('http://localhost:8080/api/v1/users/username/' + username, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users by username:', error);
            throw error;
        }}
    };
    console.log(users);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data.content);
                setUsers(response.data);
                setText('');
            } catch (error) {
                console.error('Failed to fetch users:', error);
                throw error;
            }
        };

        if (username != '') {
            getUsers();
        }
    }, [username]);
    
    const getFollowers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/users/followers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data.content);
            setUsers(response.data);
            setText('You have '+response.data.length+' followers');
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    };

    const getFollowing = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/users/following', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            setUsers(response.data);
            setText('You are following '+response.data.length+' users');
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    };

    const getAll = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            setUsers(response.data);
            setText('');
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    }
    
    return (
        <div className="users-page">
            <div className="search">
                <div className="left">
                    <input type="text" id='search' />
                    <button className="btn" onClick={() => getUsersByUsername(document.getElementById('search').value)}>Search</button>
                </div>
                {text}
                <div className="right">
                    <button className="btn" onClick={() => getAll()}>Show all</button>
                    {!isAdmin && <button className="btn" onClick={() => getFollowers()}>Followers</button>}
                    {!isAdmin && <button className="btn" onClick={() => getFollowing()}>Folowing</button>}
                </div>
            </div>
            <div className="users">
                {users && users.map((user) => (
                    <div className="user" key={user.id}>
                        <h3>{user?.firstname} {user?.lastname}</h3>
                        <button className="btn" onClick={() => navigate('/user/'+user.id)}>Visit profile</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
