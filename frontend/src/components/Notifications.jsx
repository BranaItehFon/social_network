import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  
useEffect(() => {
  const getNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/notifications",
        {
          params: {
            size: 5,
            page: currentPage
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTotalPages(response.data.totalPages);
      setNotifications(response.data.content);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      throw error;
    }
  };

  getNotifications();
}, [currentPage]);
console.log(notifications)
  return (
    <div className="report-page">
      <div className="notifications">
        <h1>Notifications</h1><div className="pagination-container">
        <button
  onClick={() => setCurrentPage(currentPage - 1)}
  disabled={currentPage === 0}
>
  Back
</button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
          key={index + 1}
          onClick={() => setCurrentPage(index)}
          disabled={currentPage === index}
        >
          {index + 1}
        </button>
        
        ))}
        <button
  onClick={() => setCurrentPage(currentPage + 1)}
  disabled={currentPage >= totalPages}
>
  Next
</button>

      </div>
      
        {notifications &&
          notifications.map((notification) => (<div className="single-notification" onClick={() => navigate('notification/'+notification.id)}>
            {notification?.isRead ?  <div className="lighter" key={notification.id} style={{ color: 'grey' }}><h3 key={notification.id} style={{ margin: "20px" }}>
            {notification.timestamp} {notification.content}!
          </h3></div> :  <div className="darker" key={notification.id} style={{ color: 'black'}}><h3 key={notification.id} style={{ margin: "20px" }}>
              {notification.timestamp} {notification.content}!
            </h3></div>} </div>
          ))}
          
      </div>
    </div>
  );
};

export default Notifications;
