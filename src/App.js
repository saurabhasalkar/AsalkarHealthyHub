import React ,{useContext}from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Added AuthProvider
import { CartProvider } from './CartContext';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import ProductVariants from './ProductVariants';
import Cart from './Cart';
import Login from './login';
import RegisterPage from './RegisterPage';
import AboutUs from './AboutUs';
import OrderConfirmation from './OrderConfirmation';
import { AuthContext } from './AuthContext';
import ContactUs from './Contactus';


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
                                <Route path="/contactus" element={<ContactUs/>} />
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
