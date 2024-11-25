import axios from 'axios';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { mainContext } from '../App';

const Register = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        profile: null
    });
    let { navigate } = useContext(mainContext)
    let userValuesHandler = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        setUser({
            ...user, profile: file
        })
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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

    const profilePreviewStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        margin: '0 auto 20px',
        display: 'block',
        objectFit: 'cover',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    };

    const uploadButtonStyle = {
        display: 'block',
        width: '100%',
        marginBottom: '15px',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        backgroundColor: '#6c63ff',
        color: '#ffffff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };


    let registerHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData()
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('profile', user.profile);
        try {

            let response = await axios.post('http://localhost:9000/api/user/register', formData)
            if (response.data.success) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate('/login')
                })

            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.data.message,
                    icon: "error"
                });
            }
        } catch (e) {
            console.log(e)
            Swal.fire({
                title: "Error!",
                text: e,
                icon: "error"
            });
        }

    }
    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Register</h2>
            <form onSubmit={registerHandler} encType='multipart/form-data'>
                {/* Profile Picture Preview */}
                {profilePic ? (
                    <img src={profilePic} alt="Profile Preview" style={profilePreviewStyle} />
                ) : (
                    <div
                        style={{
                            ...profilePreviewStyle,
                            backgroundColor: '#404052',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '0.9rem',
                        }}
                    >
                        No Image
                    </div>
                )}
                {/* Upload Profile Picture */}
                <label style={labelStyle}>Upload Profile Picture</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileChange}
                    style={{
                        marginBottom: '15px',
                        color: '#fff',
                        backgroundColor: '#404052',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '1rem',
                    }}
                />
                <label style={labelStyle}>Name</label>
                <input onChange={userValuesHandler} type="text" name='name' placeholder="Enter your name" style={inputStyle} />
                <label style={labelStyle}>Email</label>
                <input onChange={userValuesHandler} type="email" name='email' placeholder="Enter your email" style={inputStyle} />
                <label style={labelStyle}>Password</label>
                <input onChange={userValuesHandler} type="password" name='password' placeholder="Enter your password" style={inputStyle} />

                <button type="submit" style={buttonStyle}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
