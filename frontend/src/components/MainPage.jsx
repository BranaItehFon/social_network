import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import './css/UserDetails.css';

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/posts', {
          params: {
            size: 2,
            page: currentPage
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPosts(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error;
      }
    };

    getPosts();
  }, [currentPage]);

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
    <div className="main-page">
      <div className="title" style={{ backgroundColor: '#f5f5f5', height: '100px'}}>
        <h1 style={{ margin: '1%', fontSize: '80px', color: '#007bff' }}>Feed</h1>  
      </div>
      <div className="posts">
        {posts ? (
          posts.map((post) => (
            <Post post={post} key={post.id} />
          ))
        ) : (
          <>There are no posts</>
        )}
      </div>
      <div className="pagination-container">
        <button
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
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
 
export default MainPage;
