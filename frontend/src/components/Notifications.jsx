import axios from "axios";
import { useEffect, useState } from "react";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const getNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/notifications', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotifications(response.data.content);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                throw error;
            }
        };

        getNotifications();
    }, []);
    console.log(notifications)
    return (
        <div className="report-page">
            <div className="notifications">
                <h1>Notifications</h1>
                {notifications && notifications.map((notification) => (
                    <h3 key={notification.id} style={{ margin: '20px' }}>{notification.content}!</h3>
                ))}
            </div>
        </div>
    );
}

export default Notifications;