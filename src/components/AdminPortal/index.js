import { useState } from 'react'
import Header from '../Header'
import './index.css'

const AdminPortal = () => {
    const [navSection , setNavSection] = useState("1")
    const [isSearchBar , setSearchBar] = useState(true)

    const goToEmpUpd = () => {
        return(
            <div className='emp-upd-container'>
                <div className='search-sec'>
                    <div className='ran'>
                    <div className='search-bar-container'>
                   <input className='search-bar' type='search' placeholder='Enter Employee name' id='emp-search'/>
                   </div>
                   <button className='search-bar-button'>Search</button>
                   </div>
                   <button className='create-btn'>Create User</button>
                </div>
            </div>
        )
    }

    const goToEmpSal = () => {
        return(
            <h1 className='demo'>hello</h1>
        )
    }

    const changeToEmp = () =>{
        setNavSection("1")
    }

    const changeTosal = () => {
        setNavSection("2")
    }

   




    return(

        <div className='admin-container'>
              <Header />
              <div className='nav-content'>
                <nav className='nav-bar-content'>
                    <div className='nav-button' onClick={changeToEmp}>
                        Employee Updation
                    </div>
                    <div className='nav-button' onClick={changeTosal}>
                        Salary Details
                    </div>
                </nav>
                {navSection === "1" ? goToEmpUpd():goToEmpSal()}
                
              </div>
        </div>
    )
}

export default AdminPortal