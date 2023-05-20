import { useEffect, useState } from "react";
import axios from "axios";
import './css/UserDetails.css';
import NewPost from "./NewPost";
import { useParams } from "react-router-dom";
import Post from "./Post";

const Profile = ({ isMyProfile}) => {
    const { id } = useParams();
    
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getUser1 = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users/' + id, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data)
                console.log(response);
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        }
        const getUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users/currentlyLoggedIn', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data)
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        }
        const getPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/posts', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPosts(response.data)
                console.log(response);
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        }
        if(id != undefined){
            getUser1();
            console.log('tstt');
            // getPosts1(); // napravi putanju za postove nekog drugog korisnika
        }
        else{
            getUser();
            getPosts();
        }
        getPosts();
    }, [id])
    console.log(user)
    return (
        <>
            <div className="my-profile">
                <div className="user-details">
                    <div className="title">
                        <h2 style={{ fontSize: '44px', fontWeight: 'bold' }}>
                            {user?.firstname} {user?.lastname}
                        </h2>
                    </div>
                    <div className="box">
                        <p>
                            <strong>Username:</strong> {user?.username}
                        </p>
                        <p>
                            <strong>Email:</strong> {user?.email}
                        </p>
                    </div>
                    <div className="box">
                        <p>
                            <strong>Gender:</strong> {user?.gender}
                        </p>
                        <p>
                            <strong>Role:</strong> {user?.role}
                        </p>
                    </div>

                </div>

            </div>
            <div className="new-post">
                {isMyProfile && <NewPost />}
            </div>
            <div className="posts">
                {!isMyProfile ? posts.map((post) => (
                    <Post post={post} key={post.id}/>
                )): <></>}
                {posts.length === 1 ? <h1>There are no posts</h1> : <h1>test</h1>}
            </div>
        </>
    );
}

export default Profile;