import { FaAccusoft, FaUserAlt } from "react-icons/fa";

import './index.css'
import { Link } from "react-router-dom";

const Header = () => {
    return (

        <div className="header-container">
            <div className="nav-first-part">
                <div>
                    <FaAccusoft className="nav-logo" />
                </div>
                <h1>HRMS Portal</h1>
            </div>
            <div className="nav-center-part">
                <Link className="nav-page" to='/'>Home</Link>
                <Link className="nav-page" to='/adminPortal'>Admin Portar</Link>
                <Link className="nav-page" to='/register'>Register</Link>
            </div>
            <div className="nav-last-part">
               <Link className="nav-profile" to='/profile'><FaUserAlt /></Link> 
            </div>

        </div>
    )
}

export default Header