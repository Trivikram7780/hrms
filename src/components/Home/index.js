import Header from '../Header';
import { useState, useEffect } from "react";
import './index.css';
import { Line } from "react-chartjs-2";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import Cookies from 'js-cookie'; // Ensure you have this installed for cookie access

// Register Chart.js components
ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

const Home = () => {
   const [homeariable, setHomeVariable] = useState({
      hours: 0,
      minutes: 0,
      checkIn: '08:00',
      checkOut: '23:78'
   });

   const userId = Cookies.get('user_id');
   const jwtToken = Cookies.get('jwt_token');

   const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]; // X-axis (days)
   const data = {
      labels: days,
      datasets: [
         {
            label: "Work Hours",
            data: [9.5, 7.5, 9, 6, 10], // Random data representing hours worked each day
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.4,
         },
      ],
   };

   // Chart options
   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: "top",
         },
         title: {
            display: true,
            text: "5-Day Work Hours",
         },
      },
      scales: {
         y: {
            title: {
               display: true,
               text: "Hours",
            },
            min: 0,
            max: 10, // Y-axis maximum value
         },
         x: {
            title: {
               display: true,
               text: "Days",
            },
         },
      },
   };

   // Function to trigger API call on page load
   useEffect(() => {
      if (userId && jwtToken) {
         fetchReloadData();
      }
   }, [userId, jwtToken]);

   const fetchReloadData = async () => {
      try {
         const response = await fetch('http://localhost:8080/reload', { 
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({ userId }),
         });

         const data = await response.json();
         console.log(data); 

         const { todayCheckin, todayCheckout, lastFiveDaysHours } = data;

         let checkInTime = todayCheckin === "No Check-in" ? null : todayCheckin;
         let checkOutTime = todayCheckout === "No Check-out" ? null : todayCheckout;

         if (checkInTime && checkOutTime) {
       
            const checkInDate = new Date(checkInTime);  
            const checkOutDate = new Date(checkOutTime); 
            const diffInMilliseconds = checkOutDate - checkInDate; 

            const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
            const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

            setHomeVariable({
               ...homeariable,
               hours,
               minutes,
               checkIn: todayCheckin,
               checkOut: todayCheckout
            });
         } else {
            setHomeVariable({
               ...homeariable,
               hours: 0,
               minutes: 0,
               checkIn: todayCheckin,
               checkOut: todayCheckout
            });
         }
      } catch (error) {
         console.error('Error in reload API:', error);
      }
   };

   // Handle Check-In
   const handleCheckIn = async () => {
      if (userId && jwtToken) {
         try {
            const response = await fetch('http://localhost:8080/checkin', { // Replace with your check-in API
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`,
               },
               body: JSON.stringify({ userId }),
            });
            const data = await response.json();
            console.log(data);
         } catch (error) {
            console.error('Error during check-in API:', error);
         }
      }
   };

   // Handle Check-Out
   const handleCheckOut = async () => {
      if (userId && jwtToken) {
         try {
            const response = await fetch('http://localhost:8080/checkout', { // Replace with your check-out API
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`,
               },
               body: JSON.stringify({ userId }), // Only sending userId
            });
            const data = await response.json();
            console.log(data);
         } catch (error) {
            console.error('Error during check-out API:', error);
         }
      }
   };

   return (
      <div className="home-container">
         <Header />
         <div className='home-page-container'>
            <div className='hours-checkin-checkout'>
               <label className='heading'>Today Total Hours</label>
               <div className='hours-minutes'>
                  <label className='clock-para'>{homeariable.hours} : {homeariable.minutes}</label>
               </div>
               <button className='check-in' onClick={handleCheckIn}>
                  Check In
               </button>
               <button className='check-in' onClick={handleCheckOut}>
                  Check Out
               </button>
               <button className='check-in' onClick={fetchReloadData}>
                  Reload
               </button>
            </div>
            <div style={{ width: "40%" }}>
               <Line data={data} options={options} />
               <div className="check-in-out-container">
                  <h3>Today's Check-In and Check-Out</h3>
                  <table className="check-in-out-table">
                     <thead>
                        <tr>
                           <th>Type</th>
                           <th>Time</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>Check-In</td>
                           <td>{homeariable.checkIn}</td>
                        </tr>
                        <tr>
                           <td>Check-Out</td>
                           <td>{homeariable.checkOut}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
