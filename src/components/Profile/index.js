import { useState } from "react";
import Header from "../Header";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import './index.css'

const Profile  = () => {
    const [profile, setProfile] = useState({
        id:1,
        name:'SURESH',
        gender:'male',
        age:23,
        dob:'2001:11:11',
        role:'admin'


    }); 
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('jwt_token');
        navigate('/login')
        
    }

    return(
        <div className="profile-container">
             <Header/>
             <div className="peofile-sec">
             <p><strong>ID:</strong> {profile.id}</p>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Gender:</strong> {profile.gender}</p>
               <p><strong>Age:</strong> {profile.age}</p>
              <p><strong>Date of Birth:</strong> {profile.dob}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
             </button>
             </div>
           
        </div>
    )
}

export default Profile






// INSERT INTO attendance (userid, checkin, checkout)
// VALUES
// ('suresh', DATE_SUB(CURRENT_DATE(), INTERVAL 10 DAY) + INTERVAL 9 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 10 DAY) + INTERVAL 17 HOUR),
// ('suresh', DATE_SUB(CURRENT_DATE(), INTERVAL 9 DAY) + INTERVAL 9 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 9 DAY) + INTERVAL 17 HOUR),
// ('suresh', DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) + INTERVAL 9 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) + INTERVAL 17 HOUR),
// ('suresh', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) + INTERVAL 9 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) + INTERVAL 17 HOUR),
// ('suresh', DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY) + INTERVAL 9 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY) + INTERVAL 17 HOUR),
// ('suresh', DATE_SUB(CURRENT_DATE(), INTERVAL 5 DAY) + INTERVAL 9 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 5 DAY) + INTERVAL 17 HOUR),
// ('suresh', DATE_SUB(CURRENT_DATE(), INTERVAL 4 DAY) + INTERVAL 9 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 4 DAY) + INTERVAL 17 HOUR),
// ('suresh', DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY) + INTERVAL 9 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY) + INTERVAL 17 HOUR),
// ('suresh', DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY) + INTERVAL 9 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY) + INTERVAL 17 HOUR),
// ('suresh', DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) + INTERVAL 9 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) + INTERVAL 17 HOUR);

// -- Insert attendance records for the last 10 days for Ravi
// INSERT INTO attendance (userid, checkin, checkout)
// VALUES
// ('ravi', DATE_SUB(CURRENT_DATE(), INTERVAL 10 DAY) + INTERVAL 8 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 10 DAY) + INTERVAL 16 HOUR),
// ('ravi', DATE_SUB(CURRENT_DATE(), INTERVAL 9 DAY) + INTERVAL 8 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 9 DAY) + INTERVAL 16 HOUR),
// ('ravi', DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) + INTERVAL 8 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) + INTERVAL 16 HOUR),
// ('ravi', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) + INTERVAL 8 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) + INTERVAL 16 HOUR),
// ('ravi', DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY) + INTERVAL 8 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 6 DAY) + INTERVAL 16 HOUR),
// ('ravi', DATE_SUB(CURRENT_DATE(), INTERVAL 5 DAY) + INTERVAL 8 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 5 DAY) + INTERVAL 16 HOUR),
// ('ravi', DATE_SUB(CURRENT_DATE(), INTERVAL 4 DAY) + INTERVAL 8 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 4 DAY) + INTERVAL 16 HOUR),
// ('ravi', DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY) + INTERVAL 8 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY) + INTERVAL 16 HOUR),
// ('ravi', DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY) + INTERVAL 8 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY) + INTERVAL 16 HOUR),
// ('ravi', DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) + INTERVAL 8 HOUR, DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) + INTERVAL 16 HOUR);