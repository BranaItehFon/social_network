import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';

const Reports = () => {
    const [reports, setReports] = useState([]);
    useEffect(() => {
        const getReports = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/reports', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setReports(response.data.content);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                throw error;
            }
        };

        getReports();
    }, []);
    console.log(reports);
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete('http://localhost:8080/api/v1/posts/' + postId,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(response)
        } catch (error) {
            console.error('Post failed:', error);
            throw error;
        }
    }
    return (
        <div className="report-page">
            <div className="reports">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Reported Post Content</th>
                            <th>Post author</th>
                            <th>Reported by</th>
                            <th>Delete post</th>
                            <th>Dismiss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.timestamp}</td>
                                <td>{report.reportedPost.content}</td>
                                <td>{report.reportedPost.creator.username}</td>
                                <td>{report.reporter.username}</td>
                                <td><button onClick={() => deletePost(report.reportedPost.id)}>Delete</button></td>
                                <td><button onClick={() => deletePost(report.reportedPost.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>

    );
}

export default Reports;