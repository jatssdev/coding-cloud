import React from 'react';
import { Link } from 'react-router-dom';

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

    return (
        <nav style={navStyle}>
            <h2 style={{ margin: 0, color: '#ffffff' }}>ReactApp</h2>
            <div>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/register" style={linkStyle}>Register</Link>
                <Link to="/login" style={linkStyle}>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
