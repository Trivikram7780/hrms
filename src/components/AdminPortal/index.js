import { useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import './index.css';

const AdminPortal = () => {
    const [navSection, setNavSection] = useState('1');
    const [formData, setFormData] = useState({
        basicSalary: 0,
        daAllowance: 0,
        hraAllowance: 0,
        ltaAllowance: 0,
        medicalAllowance: 0,
        otherAllowances: 0,
        totalSalary: 0,
        employeeId:null// auto-calculated
      });
    const [isSearchBar, setSearchBar] = useState(true);
    const [empName, setEmpName] = useState('');
    const [employees, setEmpList] = useState([]);
    const [formType, setFormType] = useState('create'); // "create" or "update"
    const [currentEmployee, setCurrentEmployee] = useState({
        id: '',
        firstname: '',
        lastname: '',
        username: '',
        role: '',
        company: '',
    });

    const getData = async () => {
        try {
            const url = `http://localhost:8080/search-by-username?username=${empName}`;
            const response = await fetch(url);
            const data = await response.json();
            setEmpList(data);
        } catch (error) {
            console.error('Error fetching employees', error);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/delete/${id}`);
            alert('Employee deleted successfully');
            getData();
        } catch (error) {
            console.error('Error deleting employee', error);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (formType === 'create') {
            // Create User
            try {
                await axios.post('http://localhost:8080/create', currentEmployee);
                alert('Employee created successfully');
                setSearchBar(true); // Go back to search bar
                getData();
            } catch (error) {
                console.error('Error creating employee', error);
            }
        } else if (formType === 'update') {
            // Update User
            try {
                await axios.put(`http://localhost:8080/update/${currentEmployee.id}`, currentEmployee);
                alert('Employee updated successfully');
                setSearchBar(true); // Go back to search bar
                getData();
            } catch (error) {
                console.error('Error updating employee', error);
            }
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const renderSalaryDetails = () => {

        
        return (
            <div className="salary-details-container">
                <h2>Salary Details</h2>
                <table className="salary-table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.role}</td>
                                <td> <button
                                        className="edit-salary-btn"
                                        onClick={() => openSalaryForm(employee)}
                                    >
                                        Get Salary
                                    </button></td>
                                <td>
                                    <button
                                        className="edit-salary-btn"
                                        onClick={() => openSalaryForm(employee )}
                                    >
                                        Edit Salary
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    
    const openSalaryForm = (employee) => {
        setFormType('salary');
        setCurrentEmployee(employee);
        setSearchBar(false);
        setFormData({
            ...formData,
            employeeId:employee.id
        })
    };

    const handleSalaryInputChange = (e) => {
        const { name, value } = e.target;
        const numericValue = name !== "year" && name !== "month" ? parseFloat(value || 0) : value;
    
        // Update form data
        setFormData((prev) => {
          const updatedForm = { ...prev, [name]: numericValue };
    
          // Recalculate totalSalary
          updatedForm.totalSalary =
            parseFloat(updatedForm.basicSalary ) +
            parseFloat(updatedForm.daAllowance) +
            parseFloat(updatedForm.hraAllowance ) +
            parseFloat(updatedForm.ltaAllowance ) +
            parseFloat(updatedForm.medicalAllowance ) +
            parseFloat(updatedForm.otherAllowances );
    
          return updatedForm;
        });
      };
    
      // Submit handler
      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
      
        try {
          const response = await axios.post('http://localhost:8080/salary/add', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          // Handle successful response
          console.log('Salary data submitted successfully:', response.data);
          alert('Salary data submitted successfully!');
        } catch (error) {
          // Handle error response
          console.error('Error submitting salary data:', error);
          alert('Failed to submit salary data. Please try again.');
        }
      };
    
    const renderSalaryForm = () => {
        return (
            <div className="admin-portal-container">
              <h2>Salary Management</h2>
              <form onSubmit={handleSubmit} className="salary-form">
                {/* Year */}
                
        
                {/* Salary Fields */}
                {["basicSalary", "daAllowance", "hraAllowance", "ltaAllowance", "medicalAllowance", "otherAllowances"].map((field) => (
                  <div key={field} className="form-group">
                    <label>{field.replace(/([A-Z])/g, " $1")}:</label>
                    <input
                      type="number"
                      name={field}
                      value={formData[field]}
                      onChange={handleSalaryInputChange}
                      required
                      className="input-field"
                    />
                  </div>
                ))}
        
                {/* Total Salary (Non-editable) */}
                <div className="form-group">
                  <label>Total Salary:</label>
                  <input
                    type="number"
                    name="totalSalary"
                    value={formData.totalSalary}
                    readOnly
                    className="input-field readonly"
                  />
                </div>
        
                {/* Submit Button */}
                <button type="submit" className="submit-button">Submit</button>
                <button type="submit" className="submit-button" onClick={getback}>Cancel</button>
              </form>
            </div>
          );
    };
    const getback = () => {
        setSearchBar(true)
    }
    
    const handleSalarySubmit = async (event) => {
        event.preventDefault();
    
        try {
            await axios.put(
                `http://localhost:8080/update-salary/${currentEmployee.id}`,
                { salary: currentEmployee.salary }
            );
            alert('Salary updated successfully');
            setSearchBar(true); // Go back to salary details
            getData();
        } catch (error) {
            console.error('Error updating salary', error);
        }
    };
    

    const openUpdateForm = (employee) => {
        setFormType('update');
        setCurrentEmployee(employee);
        setSearchBar(false);
    };

    const openCreateForm = () => {
        setFormType('create');
        setCurrentEmployee({
            id: '',
            firstname: '',
            lastname: '',
            username: '',
            role: '',
            company: '',
        });
        setSearchBar(false);
    };

    const renderForm = () => {
        return (
            <form className="create-form" onSubmit={handleFormSubmit}>
                <h2>{formType === 'create' ? 'Create User' : 'Update User'}</h2>
                
                <div className="form-group">
                    <label htmlFor="id">Employee ID</label>
                    <input
                        type="number"
                        id="id"
                        name="id"
                        value={currentEmployee.id || ''}
                        onChange={handleInputChange}
                        placeholder="Enter Employee ID"
                        disabled={formType === 'update'} // ID is not editable for update
                        required
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="employeeType">Employee Type</label>
                    <select
                        id="employeeType"
                        name="employeeType"
                        value={currentEmployee.employeeType || ''}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Employee Type</option>
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                        <option value="Contractor">Contractor</option>
                    </select>
                </div>
    
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={currentEmployee.firstname || ''}
                        onChange={handleInputChange}
                        placeholder="Enter First Name"
                        required
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="middlename">Middle Name</label>
                    <input
                        type="text"
                        id="middlename"
                        name="middlename"
                        value={currentEmployee.middlename || ''}
                        onChange={handleInputChange}
                        placeholder="Enter Middle Name"
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={currentEmployee.lastname || ''}
                        onChange={handleInputChange}
                        placeholder="Enter Last Name"
                        required
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={currentEmployee.dob || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={currentEmployee.gender || ''}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
    
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={currentEmployee.age || ''}
                        onChange={handleInputChange}
                        placeholder="Enter Age"
                        required
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={currentEmployee.company || ''}
                        onChange={handleInputChange}
                        placeholder="Enter Company Name"
                        required
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={currentEmployee.role || ''}
                        onChange={handleInputChange}
                        placeholder="Enter Role"
                        required
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="dateOfJoin">Date of Joining</label>
                    <input
                        type="date"
                        id="dateOfJoin"
                        name="dateOfJoin"
                        value={currentEmployee.dateOfJoin || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={currentEmployee.username || ''}
                        onChange={handleInputChange}
                        placeholder="Enter Username"
                        required
                    />
                </div>
    
                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        {formType === 'create' ? 'Create' : 'Update'}
                    </button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setSearchBar(true)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    };

    const renderSearchSection = () => {
        return (
            <div className="emp-upd-container">
                <div className="search-sec">
                    <div className="ran">
                        <div className="search-bar-container">
                            <input
                                className="search-bar"
                                onChange={(e) => {setEmpName(e.target.value)}}
                                type="search"
                                placeholder="Enter Employee name"
                                value={empName}
                            />
                        </div>
                        <button className="search-bar-button" onClick={getData}>
                            Search
                        </button>
                    </div>
                    <button className="create-btn" onClick={openCreateForm}>
                        Create User
                    </button>
                </div>
                <div className="card-container">
                    {employees.map((employee) => (
                        <div className="card" key={employee.id}>
                            <h3>
                                {employee.firstname} {employee.lastname}
                            </h3>
                            <p>
                                <b>Username:</b> {employee.username}
                            </p>
                            <p>
                                <b>Role:</b> {employee.role}
                            </p>
                            <p>
                                <b>Company:</b> {employee.company || 'N/A'}
                            </p>
                            <button className="emp-btn" onClick={() => openUpdateForm(employee)}>
                                Update
                            </button>
                            <button className="emp-btn" onClick={() => deleteEmployee(employee.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="admin-container">
            <Header />
            <div className="nav-content">
                <nav className="nav-bar-content">
                    <div className="nav-button" onClick={() => setNavSection('1')}>
                        Employee Updation
                    </div>
                    <div className="nav-button" onClick={() => setNavSection('2')}>
                        Salary Details
                    </div>
                </nav>
                {navSection === '1' 
    ? (isSearchBar ? renderSearchSection() : renderForm()) 
    : (isSearchBar ? renderSalaryDetails() : renderSalaryForm())}
            </div>
        </div>
    );
};

export default AdminPortal;
