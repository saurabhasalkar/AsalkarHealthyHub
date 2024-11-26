import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; 2024 Healthy Hub. All Rights Reserved.</p>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '10px 0',
        position: 'relative', // Keep it normal so the flexbox works
    }
};

export default Footer;
