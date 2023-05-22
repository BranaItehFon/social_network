import { useState, useEffect } from "react";
import axios from "axios";
import './css/Users.css';
import { useNavigate, useParams } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const { username } = useParams();
    const navigate = useNavigate();

    const getUsersByUsername = async (username) => {
        if(username!=''){
        try {
            const response = await axios.get('http://localhost:8080/api/v1/users/username/' + username, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(response.data.content);
        } catch (error) {
            console.error('Failed to fetch users by username:', error);
            throw error;
        }}
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data.content);
                setUsers(response.data.content);
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
            setUsers(response.data.content);
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
            console.log(response.data.content);
            setUsers(response.data.content);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    };

    return (
        <div className="users-page">
            <div className="search">
                
                <div className="left">
                    <input type="text" id='search' />
                    <button className="btn" onClick={() => getUsersByUsername(document.getElementById('search').value)}>Search</button>
                </div>
                <div className="right">
                    <button className="btn" onClick={() => getFollowers()}>Followers</button>
                    <button className="btn" onClick={() => getFollowing()}>Folowing</button>
                </div>
            </div>
            <div className="users">
                {users && users.map((user) => (
                    <div className="user">
                        <h3>{user?.firstname} {user?.lastname}</h3>
                        <button className="btn" onClick={() => navigate('/user/'+user.id)}>Visit profile</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
