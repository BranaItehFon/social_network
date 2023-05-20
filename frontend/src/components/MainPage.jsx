import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import './css/UserDetails.css';

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/posts', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPosts(response.data.content)
                
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        }
        getPosts();
    }, [])
    return ( 
        <div className="main-page">
            <div className="posts">
                {posts ? posts.map((post) => (
                    <Post post={post} key={post.id}/>
                )) : <>There are no posts</>}
            </div>
        </div>
     );
}
 
export default MainPage;