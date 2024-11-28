import axios from 'axios';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { mainContext } from '../App';

const Login = () => {
    let [user, setUserValues] = useState({
        email: '',
        password: '',
    })
    let { navigate, getUserData } = useContext(mainContext)
    const containerStyle = {
        width: '400px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#2b2b3d',
        borderRadius: '10px',
        color: '#ffffff',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)',
    };

    const headingStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#4caf50',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontSize: '1rem',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        backgroundColor: '#404052',
        color: '#ffffff',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4caf50',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };
    let userValuesHandler = (e) => {
        let { name, value } = e.target
        setUserValues({ ...user, [name]: value })
    }
    let LoginHandler = async (e) => {
        e.preventDefault()
        try {
            let response = await axios.post('http://localhost:9000/api/user/login', user)
            if (response.data.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    getUserData()
                    navigate('/')
                })

            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.data.message,
                    icon: "error"
                });
            }
        } catch (e) {
            console.log(e);
            Swal.fire({
                title: "Error!",
                text: e,
                icon: "error"
            });

        }

    }
    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Login</h2>
            <form onSubmit={LoginHandler}>
                <label style={labelStyle}>Email</label>
                <input onChange={userValuesHandler} type="email" name='email' placeholder="Enter your email" style={inputStyle} />
                <label style={labelStyle}>Password</label>
                <input onChange={userValuesHandler} type="password" name='password' placeholder="Enter your password" style={inputStyle} />
                <button type="submit" style={buttonStyle}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
