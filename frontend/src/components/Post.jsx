import { useEffect, useState } from "react";
import "./css/Post.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = ({ post, isMyPost }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reactions, setReactions] = useState([]);
  const [likes, setLikes] = useState();
  const [loves, setLoves] = useState([]);
  const [angrys, setAngrys] = useState([]);
  const [sads, setSads] = useState([]);
  useEffect(() => {
    const showComments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/posts/" + post.id + "/comments",
          {
            params: {
              size: 3,
              page: currentPage,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setComments(response.data.content);
        setTotalPages(response.data.totalPages);
        console.log(response.data.content);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    };
    const showReactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/posts/" + post.id + "/reactions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReactions(response.data.content);
        setLikes(
          reactions.filter((reaction) => reaction.reactionType === "LIKE")
        );
        setLoves(
          reactions.filter((reaction) => reaction.reactionType === "LOVE")
        );
        setAngrys(
          reactions.filter((reaction) => reaction.reactionType === "ANGRY")
        );
        setSads(
          reactions.filter((reaction) => reaction.reactionType === "SAD")
        );
        console.log(reactions);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    };
    showComments();
    showReactions();
  }, [currentPage]);

  const report = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/reports/post/" + post.id,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Post failed:", error);
      throw error;
    }
  };
  const react = async (react) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/posts/" + post.id + "/react",
        {
          reactionType: react,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Post failed:", error);
      throw error;
    }
  };
  const comment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/posts/" + post.id + "/comment",
        {
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Post failed:", error);
      throw error;
    }
  };
  const deletePost = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/v1/posts/" + post.id,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Post failed:", error);
      throw error;
    }
  };
  const [content, setContent] = useState("");
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
    <div className="post">
      <div className="post-header">
        <h3
          className="post-author"
          onClick={() => navigate("/user/" + post?.creator.id)}
        >
          {post?.creator.firstname} {post?.creator.lastname}
        </h3>
        {!isMyPost ? (
          <button
            className="post-action-button-report"
            onClick={() => report()}
          >
            Report
          </button>
        ) : (
          <button
            className="post-action-button-report"
            onClick={() => deletePost()}
          >
            Delete
          </button>
        )}
      </div>
      <h5 className="post-time">{post?.timePosted}</h5>
      <div className="post-content">{post?.content}</div>
      <div className="post-reactions">
        <>
          <button
            className="post-action-button-emoji"
            onClick={() => react("LIKE")}
          >
            👍
          </button>
          {likes?.length === 0 ? <></> : <>{likes?.length}</>}
        </>
        <>
          <button
            className="post-action-button-emoji"
            onClick={() => react("LOVE")}
          >
            💖
          </button>
          {loves?.length === 0 ? <></> : <>{loves?.length}</>}
        </>
        <>
          <button
            className="post-action-button-emoji"
            onClick={() => react("ANGRY")}
          >
            😠
          </button>
          {angrys?.length === 0 ? <></> : <>{angrys?.length}</>}
        </>
        <>
          <button
            className="post-action-button-emoji"
            onClick={() => react("SAD")}
          >
            😥
          </button>
          {sads?.length === 0 ? <></> : <>{sads?.length}</>}
        </>
      </div>
      <div className="comment">
        <input
          type="text"
          id="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn" onClick={() => comment()}>
          Comment
        </button>
      </div>
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
      <div className="comments">
        {comments &&
          comments.map((one) => (
            <div key={one.id} className="comment-item">
              <h5 onClick={() => navigate("/user/" + one.creator.id)}>
                {one.creator.firstname} {one.creator.lastname}
              </h5>
              <span> {one.content}</span>
            </div>
          ))}
      </div>
      <div className="reactions">
        {reactions &&
          reactions.map((reaction) => (
            <h5>
              {reaction?.likedByUser.username} reacted: {reaction?.reactionType}
            </h5>
          ))}
      </div>
    </div>
  );
};

export default Post;
