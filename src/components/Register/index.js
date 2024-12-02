import { useState } from 'react'
import { differenceInYears, parseISO } from "date-fns";
import './index.css'




const Register = () => {

    const [register, setReister] = useState({
        username: "",
        fistName: "",
        middleName: "",
        lastName: "",
        dob: "",
        age: null,
        company: "",
        role: "",
        doj: "",
        gender: "",
        empType:""
    })
    const [mantain, setMatain] = useState({
        page: 1,
        isDateValid: true,
        dateErrorMsg: "",

    })

    const changeUsername = event => {
        setReister(prevState => {
            return {
                ...prevState,
                username: event.target.value
            }
        })
    }

    const changeFirstname = event => {
        setReister(
            prevState => {
                return {
                    ...prevState,
                    fistName: event.target.value
                }
            }
        )
    }

    const changeRole = event => {
        setReister(preveState => {
            return{
                ...preveState,
                role:event.target.value
            }
        })
    }

    const changeEmpType = event => {
        setReister(prevState => {
            return{
                ...prevState,
                empType:event.target.value
            }
        })
    }

    const changeMiddlename = event => {
        setReister(
            prevState => {
                return {
                    ...prevState,
                    middleName: event.target.value
                }
            }
        )
    }

    const changeDate = event => {
        setReister(
            prevState => {
                return {
                    ...prevState,
                    dob: event.target.value
                }
            }
        )
    }

    const changeLastname = event => {
        setReister(
            prevState => {
                return {
                    ...prevState,
                    lastName: event.target.value
                }
            }
        )
    }

    const changeGender = event => {
        setReister(
            prevState => {
                return {
                    ...prevState,
                    gender: event.target.value
                }
            }
        )
    }

    const calculateAge = (dateString) => {
        try {
        
            const birthDate = parseISO(dateString);

           
            const today = new Date();
            const age = differenceInYears(today, birthDate);

            return age.toString(); 
        } catch (error) {
            console.error("Error calculating age:", error);
            return null;
        }
    };




    const validateDate = () => {


        const today = new Date().toISOString().split("T")[0];
        if (register.dob === "") {
            setMatain(prevState => {
                return {
                    ...prevState,
                    dateErrorMsg: "Please Enter Date",
                    age: null,
                    isDateValid: false
                }
            })
        }
        else if (register.dob > today) {
            setMatain(prevState => {
                return {
                    ...prevState,
                    dateErrorMsg: "Date Should not be in future",
                    age: null,
                    isDateValid: false
                }
            })
        }
        else {
            let calculatedAge = calculateAge(register.dob);
            console.log("cal age " + calculateAge)


            setMatain(prevState => {
                return {
                    ...prevState,
                    dateErrorMsg: "",
                    isDateValid: true,
                }
            })

            setReister((prevState) => ({
                ...prevState,
                age: calculatedAge,
            }));

        }

      
    }

    return (
        <div className='register-page-container'>
            <div className='register-form-container'>
                <p className="register-heading">Create User</p>
                <form className='register-form'>
                    <label className='username-label' htmlFor='username'>
                        USENAME*
                    </label>
                    <div className="input-container">
                        <input
                            className="username-input"
                            value={register.username}
                            type="text"
                            id="username"
                            placeholder='Enter Username'
                            onChange={changeUsername}
                            required
                        />
                    </div>
                    <label className='username-label' htmlFor='firstname'>
                        First Name*
                    </label>
                    <div className="input-container">
                        <input
                            className="username-input"
                            value={register.fistName}
                            type="text"
                            id="firstname"
                            placeholder='Enter your First Name'
                            onChange={changeFirstname}
                            required
                        />
                    </div>
                    <label className='username-label' htmlFor='middlename'>
                        Middle Name
                    </label>
                    <div className="input-container">
                        <input
                            className="username-input"
                            value={register.middleName}
                            type="text"
                            id="middlename"
                            placeholder='Enter your Middle Name'
                            onChange={changeMiddlename}

                        />
                    </div>
                    <label className='username-label' htmlFor='lastname'>
                        Last Name*
                    </label>
                    <div className="input-container">
                        <input
                            className="username-input"
                            value={register.lastName}
                            type="text"
                            id="lastname"
                            placeholder='Enter your last Name'
                            onChange={changeLastname}
                            required
                        />
                    </div>
                    <label className='username-label' htmlFor='dob'>
                        Data Of Birth*
                    </label>
                    <div className="input-date-container">
                        <input
                            className="username-input"
                            value={register.dob}
                            type="date"
                            id="dob"
                            onChange={changeDate}
                            onBlur={validateDate}
                            required
                        />
                    </div>
                    {!mantain.isDateValid && <label className='date-para' htmlFor='dob'>{mantain.dateErrorMsg}</label>}
                    <div className='age-gender-container'>
                        <div className='age-container'>
                            <label className='age-lable' htmlFor='age'>Age</label>
                            <div className="input-date-container">
                                <input
                                    className="username-input"
                                    value={register.age}
                                    type="number"
                                    id="age"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className='gender-container'>
                            <label className='gender-lable'>Gender*</label>
                            <div className='radio-item'>
                                <input className='radio'
                                    value={register.gender}
                                    type='radio'
                                    name='gender'
                                    id='male'
                                    onClick={changeGender}
                                    required
                                />
                                <label htmlFor='male'>Male</label>
                            </div>
                            <div className='radio-item'>
                                <input className='radio'
                                    value={register.gender}
                                    type='radio'
                                    name='gender'
                                    id='female'
                                    required
                                    onClick={changeGender}
                                />
                                <label htmlFor='female'>Female</label>
                            </div>

                        </div>
                    </div>
                    <label className='username-label' htmlFor='role'>
                        Role
                    </label>
                    <div className="input-container">
                        <input
                            className="username-input"
                            value={register.role}
                            type="text"
                            id="role"
                            placeholder='Enter your role'
                            onChange={changeRole}

                        />
                    </div>
                    <label className='username-label' htmlFor='empType'>
                        Employee Type
                    </label>
                    <div className="input-container">
                        <input
                            className="username-input"
                            value={register.role}
                            type="text"
                            id="empType"
                            placeholder='Enter emp Type'
                            onChange={changeEmpType}

                        />
                    </div>
                    <label className='username-label' htmlFor='role'>
                        Role
                    </label>
                    <div className="input-container">
                        <input
                            className="username-input"
                            value={register.role}
                            type="text"
                            id="role"
                            placeholder='Enter your role'
                            onChange={changeRole}

                        />
                    </div>
                    
                </form>
            </div>
        </div>

    )

}

export default Register