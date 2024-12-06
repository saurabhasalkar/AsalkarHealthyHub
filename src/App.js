import React, { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutUs from './AboutUs';
import { AuthContext, AuthProvider } from './AuthContext';
import Cart from './Cart';
import { CartProvider } from './CartContext';
import ContactUs from './ContactUs';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Login from './login';
import OrderConfirmation from './OrderConfirmation';
import ProductVariants from './ProductVariants';
import RegisterPage from './RegisterPage';

const App = () => {
    const ProtectedRoute = ({ element }) => {
        const { user } = useContext(AuthContext);
        return user ? element : <Navigate to="/login" />;
    };

    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div style={styles.appContainer}>
                        <Header />
                        <main style={styles.mainContent}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/productvariants/:productId" element={<ProductVariants />} />
                                <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/aboutus" element={<AboutUs />} />
                                <Route path="/contactus" element={<ContactUs />} />
                                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                                <Route path="*" element={<h2>404: Page Not Found</h2>} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

const styles = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    mainContent: {
        flex: 1,
    },
};

export default App;
