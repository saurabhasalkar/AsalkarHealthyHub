import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import ProductVariants from './ProductVariants';

const App = () => {
    return (
        <Router>
            <div style={styles.appContainer}>
                {/* Header is always displayed */}
                <Header />

                {/* Dynamic Routes */}
                <main style={styles.mainContent}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/productvariants/:id" element={<ProductVariants />} ></Route>
                        {/* Add more routes as needed */}
                    </Routes>
                </main>

                {/* Footer is always displayed */}
                <Footer />
            </div>
        </Router>
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