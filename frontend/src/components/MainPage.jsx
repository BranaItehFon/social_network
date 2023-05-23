import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import './css/UserDetails.css';

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPosts, setShowPosts] = useState();
  
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response)
        setPosts(response.data.content);
        setShowPosts(response.data.content.slice((currentPage - 1) * 2, currentPage * 2));
        // setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error;
      }
    };

    getPosts();
  }, []);
  
  useEffect(() => {
    setShowPosts(posts.slice((currentPage - 1) * 2, currentPage * 2));
  }, [currentPage])
  
  return ( 
    <div className="main-page">
      <div className="title" style={{ backgroundColor: '#f5f5f5', height: '100px' }}>
  <h1 style={{ margin: '1%', fontSize: '80px', color: '#007bff' }}>Feed</h1>
  {/* {weather} */}
</div>
<div className="pagination-container">
  <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
  {Array.from({ length: Math.ceil(posts.length / 2) }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index)}
    >
      {index + 1}
    </button>
  ))}
  <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(posts.length / 2)}>Next</button>
</div>

      <div className="posts">
        {showPosts ? (
          showPosts.map((post) => (
            <Post post={post} key={post.id} />
          ))
        ) : (
          <h1>There are no posts</h1>
        )}
      </div>
      <div className="pagination-container">
        {/* <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
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
          disabled={currentPage === totalPages}
        >
          Next
        </button> */}
      </div>
    </div>
  );
}
 
export default MainPage;
