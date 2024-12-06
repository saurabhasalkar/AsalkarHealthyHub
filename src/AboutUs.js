import React from 'react';

const styles = {
    page: {
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)', // Gradient background for a modern look
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    backgroundLogo: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
        opacity: 0.1, // Softer visibility for a professional watermark effect
        width: '1000px', // Large enough to span the background
        height: 'auto',
    },
    container: {
        padding: '40px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency for blending with the background
        borderRadius: '12px',
        maxWidth: '900px',
        width: '100%',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)', // Modern shadow effect
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
    },
    heading: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#2c3e50', // Professional dark color
        marginBottom: '25px',
        textTransform: 'uppercase', // Adds emphasis
        letterSpacing: '1px',
    },
    paragraph: {
        fontSize: '18px',
        lineHeight: '1.8',
        color: '#34495e', // Darker gray for text readability
        marginBottom: '20px',
        textAlign: 'justify',
    },
    highlight: {
        color: '#e67e22', // Contrast highlight for important text
        fontWeight: 'bold',
    },
    productsSection: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '30px',
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        width: '200px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        textAlign: 'center',
    },
    productCardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
    },
    productTitle: {
        fontSize: '18px',
        fontWeight: '600',
        margin: '10px 0',
        color: '#2c3e50',
    },
    productImage: {
        width: '100%',
        borderRadius: '8px',
        marginBottom: '10px',
    },
};

const AboutUs = () => {
    const products = [
        { name: 'Sunflower Oil', image: '/sunflowerhome.jpg' },
        { name: 'Groundnut Oil', image: '/groundhome.jpg' },
        { name: 'Safflower Oil', image: '/saffhome.jpg' },
        { name: 'Coconut Oil', image: '/cocohome.jpg' },
        { name: 'Pend', image: '/groundpend.jpg' },
    ];

    return (
        <div style={styles.page}>
            {/* Background Logo */}
            <img
                src="/logoahh.jpeg" // Replace with the actual path to your logo
                alt="Background Logo"
                style={styles.backgroundLogo}
            />

            {/* Content Section */}
            <div style={styles.container}>
                <h1 style={styles.heading}>
                    Welcome to <span style={styles.highlight}>Asalkar Healthy Hub</span>
                </h1>
                <p style={styles.paragraph}>
                    At <strong>Asalkar Healthy Hub</strong>, we bring you the purest cold-pressed oils, crafted with traditional methods to preserve their <span style={styles.highlight}>natural nutrients</span> and flavors. Our mission is to enhance your lifestyle with healthy, chemical-free alternatives that combine tradition and innovation.
                </p>
                <p style={styles.paragraph}>
                    Whether you're cooking a family meal or experimenting with gourmet recipes, our oils are designed to elevate every dish with the goodness of nature.
                </p>

                <h2 style={styles.heading}>Our Products</h2>
                <div style={styles.productsSection}>
                    {products.map((product, index) => (
                        <div
                            key={index}
                            style={styles.productCard}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = styles.productCardHover.transform;
                                e.currentTarget.style.boxShadow = styles.productCardHover.boxShadow;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = styles.productCard.boxShadow;
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                style={styles.productImage}
                            />
                            <h3 style={styles.productTitle}>{product.name}</h3>
                        </div>
                    ))}
                </div>

                <p style={styles.paragraph}>
                    Available in convenient packaging options of <strong>500 ml, 1L, and 5L</strong>, we ensure quality and freshness in every bottle.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
