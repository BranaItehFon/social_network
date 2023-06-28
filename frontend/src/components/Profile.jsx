import { useEffect, useState } from "react";
import axios from "axios";
import "./css/UserDetails.css";
import NewPost from "./NewPost";
import { useParams } from "react-router-dom";
import Post from "./Post";
import Activity from "./Activity";

const Profile = () => {
  const getIsFollowing = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/users/isFollowing/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsFollowing(response.data);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(getIsFollowing());
  const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isAdmin, setIsAdmin] = useState();
  const [userId, setUserId] = useState();
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/currentlyLoggedIn",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCurrentUser(response.data);
        setIsAdmin(response.data.role==='ADMIN')
        setUserId(response.data.id);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    };
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/" + id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    };
    getUser();
    getCurrentUser();
  }, []);
  useEffect(() => {
    const getPosts = async () => {
      
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/posts/users/" + id,
          {
            params: {
              size: 1,
              page: currentPage,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPosts(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    };

    if (typeof isFollowing === "boolean") {
      if ((isFollowing || currentUser?.id == id) || isAdmin) {
        getPosts();
      } else {
        setPosts([]);
      }
    }
  }, [isFollowing, currentPage]);

  const follow = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/follow/" + id,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsFollowing(true);
    } catch (error) {
      console.error("Failed to follow user:", error);
      throw error;
    }
  };

  const unfollow = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/v1/users/unfollow/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsFollowing(false);
    } catch (error) {
      console.error("Post failed:", error);
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
    <>
      <div className="my-profile">
        <div className="user-details">
          <div className="title">
            <h2 style={{ fontSize: "44px", fontWeight: "bold" }}>
              {user?.firstname} {user?.lastname}
              {currentUser?.id != id && !isAdmin &&
                (isFollowing == true ? (
                  <>
                    <button className="btn" onClick={() => unfollow()}>
                      Unfollow
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn" onClick={() => follow()}>
                      Follow
                    </button>
                  </>
                ))}
            </h2>
          </div>
          <div className="box">
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Gender:</strong> {user?.gender}
            </p>
          </div>
          {currentUser?.id == id && <Activity id={userId}/>}
        </div>
        
      </div>
      <div className="new-post">{currentUser?.id == id && <NewPost />}</div>
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
      <div className="posts">
        {posts.map((post) => (
          <Post post={post} key={post.id} isMyPost={currentUser?.id == id} isAdmin={isAdmin}/>
        ))}
      </div>
    </>
  );
};

export default Profile;
