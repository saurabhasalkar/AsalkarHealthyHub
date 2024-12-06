import React from 'react';
 
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px',
        maxWidth: '1200px',
        margin: '50px auto',
        backgroundColor: 'white', // Changed background color to a soft light blue
        borderRadius: '15px',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    logoSection: {
        flex: 1,
        textAlign: 'center',
    },
    logo: {
        maxWidth: '400px',
        borderRadius: '15px',
    },
    contactSection: {
        flex: 1,
        textAlign: 'center',
    },
    heading: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '30px',
        textTransform: 'uppercase',
    },
    contactItem: {
        fontSize: '20px',
        margin: '20px 0',
        color: '#34495e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: '15px',
        width: '30px',
        height: '30px',
    },
    link: {
        color: '#2980b9',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '20px',
        transition: 'color 0.3s',
    },
    footer: {
        marginTop: '40px',
        fontSize: '18px',
        color: '#7f8c8d',
    },
};

const ContactUs = () => {
    return (
        <div style={styles.container}>
            {/* Logo Section */}
            <div style={styles.logoSection}>
                <img
                    src="/logoahh.jpeg" // Replace with your actual logo path
                    alt="Asalkar Healthy Hub Logo"
                    style={styles.logo}
                />
            </div>
 
            {/* Contact Section */}
            <div style={styles.contactSection}>
                <h1 style={styles.heading}>Contact Us</h1>
 
                {/* WhatsApp Contact */}
                <div style={styles.contactItem}>
                    <img
                        src="https://img.icons8.com/color/48/whatsapp.png"
                        alt="WhatsApp Logo"
                        style={styles.icon}
                    />
                    <span>Phone: <strong>+91-9876543210</strong></span>
                </div>
 
                {/* Gmail Contact */}
                <div style={styles.contactItem}>
                    <img
                        src="https://img.icons8.com/color/48/gmail.png"
                        alt="Gmail Logo"
                        style={styles.icon}
                    />
                    <span>
                        Email: <a href="mailto:example@example.com" style={styles.link}>example@example.com</a>
                    </span>
                </div>
 
                {/* Facebook Contact */}
                <div style={styles.contactItem}>
                    <img
                        src="https://img.icons8.com/color/48/facebook.png"
                        alt="Facebook Logo"
                        style={styles.icon}
                    />
                    <span>
                        Facebook: <a href="https://facebook.com/YourPage" target="_blank" rel="noopener noreferrer" style={styles.link}>facebook.com/YourPage</a>
                    </span>
                </div>
 
                <p style={styles.footer}>We look forward to hearing from you. Reach out to us anytime!</p>
            </div>
        </div>
    );
};
 
export default ContactUs;
 