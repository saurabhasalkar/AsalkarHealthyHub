import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <img
                    src="/logoahh.jpeg" // Replace this URL with your logo URL
                    alt="Company Logo"
                    style={styles.logo}
                />
                <h1 style={styles.companyName}>Asalkar Healthy Hub</h1>
            </div>
            <nav>
                <ul style={styles.navList}>
                    <li><a href="#about" style={styles.navLink}>About Us</a></li>
                    <li><a href="#contact" style={styles.navLink}>Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '20px 30px', // Increased padding to make the header broader
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px', // Slightly increased gap between logo and text
    },
    logo: {
        width: '60px', // Increased logo size for better visibility
        height: '60px',
        borderRadius: '10%', // Optional: Keeps it slightly rounded
    },
    companyName: {
        margin: 0,
        fontSize: '24px', // Slightly larger text for the company name
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        gap: '20px', // Increased spacing between navigation items
        margin: 0,
        padding: 0,
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px', // Adjust font size for better readability
    },
};

export default Header;
