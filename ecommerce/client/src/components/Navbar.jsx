import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mainContext } from '../App';

const Navbar = () => {
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#1e1e2f',
        color: '#ffffff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    };

    const linkStyle = {
        margin: '0 15px',
        textDecoration: 'none',
        color: '#f0f0f0',
        fontSize: '18px',
        fontWeight: '500',
    };
    let imgStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%'
    }
    let { loginUser, logoutHandler } = useContext(mainContext)

    return (
        <nav style={navStyle}>
            {
                loginUser ? <img style={imgStyle} src={loginUser.profile} alt="" /> : <h2 style={{ margin: 0, color: '#ffffff' }}>Ecommerce</h2>
            }

            <div>
                <Link to="/" style={linkStyle}>Home</Link>

                {
                    loginUser ? <button onClick={logoutHandler}>logout</button> : <>

                        <Link to="/register" style={linkStyle}>Register</Link>
                        <Link to="/login" style={linkStyle}>Login</Link></>
                }


            </div>
        </nav >
    );
};

export default Navbar;
