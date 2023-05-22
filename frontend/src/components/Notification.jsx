import React, { useEffect, useState } from 'react';
import './css/Notification.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Notification = () => {
    const { id } = useParams();
    const [notification, setNotification] = useState();
    useEffect(() => {
        const getNotification = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/v1/notifications/" + id,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setNotification(response.data);
            } catch (error) {
                console.error("Login failed:", error);
                throw error;
            }
        };
        getNotification();
    }, [])
    console.log(notification)
    return (
        <div className="notification-unread">
            <p>{notification?.timestamp}</p>
            <p>{notification?.content}</p>
            <div className="user-details">
                <div className="publisher">
                    <h4>Publisher</h4>
                    <p>User: {notification?.publisher.username}</p>
                    <p>Email: {notification?.publisher.email}</p>
                    <p>Role: {notification?.publisher.role}</p>
                </div>
                <div className="subscriber">
                    <h4>Subscriber</h4>
                    <p>User: {notification?.subscriber.username}</p>
                    <p>Email: {notification?.subscriber.email}</p>
                    <p>Role: {notification?.subscriber.role}</p>
                </div>
            </div>
        </div>
    );
};

export default Notification;
