import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import ProductVariants from './ProductVariants';
import { CartProvider } from './CartContext';
import Cart from './Cart';

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