import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext'; // Import the CartContext to access cart items

const Header = () => {
    const { cart } = useContext(CartContext); // Get cart items from context
    const navigate = useNavigate(); // To navigate to the Cart page

    const handleViewCart = () => {
        navigate('/cart'); // Redirect to the cart page
    };

    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <img
                    src="/logoahh.jpeg" // Replace this URL with your logo URL
                    alt="Company Logo"
                    style={styles.logo}
                />
                <h1 style={styles.companyName}> Healthy Hub</h1>
            </div>
            <nav>
                <ul style={styles.navList}>
                    <li><a href="#about" style={styles.navLink}>About Us</a></li>
                    <li><a href="#contact" style={styles.navLink}>Contact</a></li>
                    {/* View Cart Button */}
                    <li style={styles.cartContainer}>
    <div style={styles.cartWrapper}>
        <span style={styles.cartCount}>{cart.length}</span>
        <img
            src="/cartlogo.png" // Replace with the actual path to your cart image
            alt="View Cart"
            style={styles.cartImage}
            onClick={handleViewCart}
        />
    </div>
</li>

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
    cartContainer: {
        position: 'relative',
        display: 'inline-block',
    },
    cartWrapper: {
        position: 'relative',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
    },
    cartCount: {
        position: 'absolute',
        top: '-8px', // Adjust to place it above the cart icon
        right: '-8px', // Adjust to align correctly
        backgroundColor: 'black',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
        borderRadius: '50%',
        padding: '4px 6px',
        textAlign: 'center',
        minWidth: '20px', // Ensures consistent circle size
    },
    cartImage: {
        width: '100%', // Ensures it fits the wrapper
        height: '100%',
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
    viewCartButton: {
        backgroundColor: '#ffc107',
        color: '#333',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
    },
};

export default Header;
