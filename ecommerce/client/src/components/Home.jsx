import React, { useContext } from 'react';
import { mainContext } from '../App';

const Home = () => {
    let { loginUser } = useContext(mainContext)
    const homeStyle = {
        textAlign: 'center',
        padding: '40px',
        color: '#ffffff',
        backgroundColor: '#1e1e2f',
        height: '100vh',
    };

    const headingStyle = {
        fontSize: '3rem',
        marginBottom: '20px',
        color: '#4caf50',
    };

    const paragraphStyle = {
        fontSize: '1.2rem',
    };

    return (
        <div style={homeStyle}>
            <h1 style={headingStyle}>Welcome {loginUser ? loginUser.name : 'user'}</h1>
            <p style={paragraphStyle}>This is the Home page of your application.</p>
        </div>
    );
};

export default Home;
