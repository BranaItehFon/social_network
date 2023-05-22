import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


const Activity = () => {
    const [activityData, setActivityData] = useState();
    const [chartOptions, setChartOptions] = useState({});
    const [user, setUser] = useState();
    const [chartData, setChartData] = useState({
        datasets: [],
      });


      useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users/currentlyLoggedIn', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data)
                // console.log(user)
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        }
        
        getUser();
        
      }, []);
      useEffect(()=>{
        const getChartData = async () => {
            try {
              const response = await axios.get(
                "http://localhost:8080/api/v1/users/" + user?.id + "/actions",
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              
              const labels = Object.keys(response.data);
              const counts = Object.values(response.data);
              const lengths = counts.map((arr) => arr.length);
          
              const chartData = {
                labels: labels,
                datasets: [
                  {
                    label: "Ratings",
                    data: lengths,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.4)",
                  },
                ],
              };
          
              setChartData(chartData);
            } catch (error) {
              console.error(error);
            }
          };
          
        getChartData();
      }, [user])
    return ( 
        <div className="activity">
            <Bar data={chartData} options={chartOptions}/>
        </div>
     );
}
 
export default Activity;