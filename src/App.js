import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutUs from './AboutUs';
import Cart from './Cart';
import { CartProvider } from './CartContext';
import ContactUs from './ContactUs';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import OrderConfirmation from './OrderConfirmation';
import ProductVariants from './ProductVariants';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <div style={styles.appContainer}>
                    <Header />
                    <main style={styles.mainContent}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/productvariants/:productId" element={<ProductVariants />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/aboutus" element={<AboutUs />} />
                            <Route path="/contactus" element={<ContactUs />} />
                            <Route path="/order-confirmation" element={<OrderConfirmation />} />

                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
};


const styles = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    mainContent: {
        flex: 1, // Ensures the main content fills the space between the header and footer
    },
};

export default App;