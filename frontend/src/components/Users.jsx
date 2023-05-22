import { useState, useEffect } from "react";
import axios from "axios";
import './css/Users.css';
import { useNavigate, useParams } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const { username } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
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
                    params: {
                        size: 3,
                        page: currentPage
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data.content);
                setUsers(response.data.content);
                setTotalPages(response.data.totalPages);
                setText('');
            } catch (error) {
                console.error('Failed to fetch users:', error);
                throw error;
            }
        };

        if (username != '') {
            getUsers();
        }
    }, [username, currentPage]);
    
    const getFollowers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/users/followers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data.content);
            setUsers(response.data.content);
            setText('You have '+response.data.totalElements+' followers');
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
            setText('You are following '+response.data.totalElements+' users');
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
      };
    
      const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
      };
    
      const handlePageClick = (pageIndex) => {
        setCurrentPage(pageIndex);
      };
    
    return (
        <div className="users-page">
            <div className="search">
                <div className="left">
                    <input type="text" id='search' />
                    <button className="btn" onClick={() => getUsersByUsername(document.getElementById('search').value)}>Search</button>
                </div>
                {text}
                <div className="right">
                    <button className="btn" onClick={() => getFollowers()}>Followers</button>
                    <button className="btn" onClick={() => getFollowing()}>Folowing</button>
                </div>
            </div>
            <div className="users">
            <div className="pagination-container">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index)}
            disabled={currentPage === index}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
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
