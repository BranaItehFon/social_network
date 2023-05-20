import { useState, useEffect } from "react";
import axios from "axios";
import './css/Users.css';
import { useNavigate, useParams } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const { username } = useParams();
    const navigate = useNavigate();

    const getUsersByUsername = async (username) => {
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
        }
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

        if (username !== '') {
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

    const follow = async (id) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/follow/' + id,  {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(id);
        } catch (error) {
            console.error('Failed to follow user:', error);
            throw error;
        }
    };

    const unfollow = async (id) => {
        try {
            const response = await axios.delete('http://localhost:8080/api/v1/users/unfollow/'+id,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Post failed:', error);
            throw error;
        }
    }

    return (
        <div className="users-page">
            <div className="search">
                <input type="text" id='search' />
                <button className="btn" onClick={() => getUsersByUsername(document.getElementById('search').value)}>Search</button>
                <button className="btn" onClick={() => getFollowers()}>Followers</button>
                <button className="btn" onClick={() => getFollowing()}>Folowing</button>
            </div>
            <div className="users">
                {users && users.map((user) => (
                    <div
                        className="user"
                        key={user.id}
                        onClick={(event) => {
                            if (!event.target.matches('.btn')) {
                                console.log(user.id);
                            }
                        }}
                    >
                        <h3>{user?.firstname}</h3>
                        <button className="btn" onClick={() => follow(user.id)}>
                            Follow
                        </button>
                        <button className="btn" onClick={() => unfollow(user.id)}>
                            Unfollow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
