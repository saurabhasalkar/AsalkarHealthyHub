import React from 'react';

const styles = {
    container: {
        padding: '40px',
        backgroundColor: '#f5f5f5',
        borderRadius: '12px',
        maxWidth: '1000px',
        margin: '50px auto',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        textAlign: 'center',
    },
    heading: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '25px',
    },
    paragraph: {
        fontSize: '18px',
        lineHeight: '1.8',
        color: '#555',
        marginBottom: '20px',
        textAlign: 'justify',
    },
    highlight: {
        color: '#2c7be5',
        fontWeight: 'bold',
    },
    productsSection: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '15px', // Added spacing between cards
        marginBottom: '30px',
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '15px',
        width: '180px', // Reduced width for smaller cards
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
    },
    productCardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
    },
    productTitle: {
        fontSize: '16px',
        fontWeight: '600',
        margin: '10px 0',
        color: '#2c7be5',
    },
    productImage: {
        width: '100%',
        borderRadius: '8px',
        marginBottom: '10px',
    },
};

const AboutUs = () => {
    const products = [
        { name: 'Sunflower Oil', image: '/images/sunflower-oil.jpg' },
        { name: 'Groundnut Oil', image: '/images/groundnut-oil.jpg' },
        { name: 'Safflower Oil', image: '/images/safflower-oil.jpg' },
        { name: 'Coconut Oil', image: '/images/coconut-oil.jpg' },
    ];

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to <span style={styles.highlight}>Asalkar Healthy Hub</span></h1>
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
                        style={{
                            ...styles.productCard,
                        }}
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
    );
};

export default AboutUs;
