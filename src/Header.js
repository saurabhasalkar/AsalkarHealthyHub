import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext for authentication
import { CartContext } from './CartContext'; // Import CartContext for cart data
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useContext(AuthContext); // Access user and logout function
    const { cart } = useContext(CartContext); // Access cart items
    const navigate = useNavigate();

    const [showUserMenu, setShowUserMenu] = useState(false); // State to toggle user menu

    const handleViewCart = () => {
        navigate('/cart'); // Navigate to cart page
    };

    const handleLogout = () => {
        logout(); // Log the user out
        navigate('/login'); // Redirect to login page
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu); // Toggle the dropdown menu
    };

    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <img src="/logoahh.jpeg" alt="Company Logo" style={styles.logo} />
                <h1 style={styles.companyName}>Healthy Hub</h1>
            </div>
            <nav>
                <ul style={styles.navList}>
                    {!user ? (
                        <>
                            <li><a href="/login" style={styles.navLink}>Login</a></li>
                            <li><a href="/register" style={styles.navLink}>Register</a></li>
                        </>
                    ) : (
                        <li style={styles.userContainer}>
                            <div style={styles.userWrapper} onClick={toggleUserMenu}>
                                <img
                                    src="/profileicon.png"
                                    alt="User"
                                    style={styles.userImage}
                                />
                                
                            </div>
                            {showUserMenu && (
                                <div style={styles.userMenu}>
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <button onClick={handleLogout} style={styles.logoutButton}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </li>
                    )}
                    <li><a href="/aboutus" style={styles.navLink}>About Us</a></li>
                    <li><a href="/contactus" style={styles.navLink}>Contact Us</a></li>
                    <li>
                        <div style={styles.cartContainer} onClick={handleViewCart}>
                            <span style={styles.cartCount}>{cart.length}</span>
                            <img
                                src="/cartlogo.png"
                                alt="Cart"
                                style={styles.cartImage}
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
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    logo: {
        width: '50px',
        height: '50px',
        borderRadius: '10%',
    },
    companyName: {
        margin: 0,
        fontSize: '24px',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0,
        padding: 0,
        alignItems: 'center',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: '500',
        transition: 'color 0.3s',
    },
    userContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    userWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    userImage: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
    },
    userName: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: '500',
    },
    userMenu: {
        position: 'absolute',
        top: '50px',
        right: '0',
        backgroundColor: '#fff',
        color: '#333',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minWidth: '200px',
        zIndex: 1001,
    },
    logoutButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '10px',
    },
    cartContainer: {
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    cartImage: {
        width: '30px',
        height: '30px',
    },
    cartCount: {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        backgroundColor: 'red',
        color: '#fff',
        borderRadius: '50%',
        padding: '4px 6px',
        fontSize: '12px',
        fontWeight: 'bold',
        minWidth: '20px',
        textAlign: 'center',
    },
};

export default Header;
