import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [productCategories, setProductCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9090/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProductCategories(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false); // Ensure loading stops after fetch
            }
        };

        fetchData();
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/productvariants/${productId}`); // Fixed string interpolation
    };

    return (
        <main style={styles.main}>
            <section style={styles.productsSection}>
                <h1 style={styles.heading}>Our Product Categories</h1>
                {loading ? (
                    <p style={styles.loading}>Loading products...</p> // Display loading message
                ) : error ? (
                    <p style={styles.error}>{error}</p> // Display error message
                ) : (
                    <div style={styles.productsContainer}>
                        {productCategories.map((category) => (
                            <div
                                key={category.id}
                                style={styles.productCard}
                                onClick={() => handleProductClick(category.id)}
                                role="button" // Accessibility role
                                tabIndex="0" // Make div focusable
                                aria-label={`View products in ${category.name}`}>
                                <img
                                    src={`data:image/jpeg;base64,${category.image}`}
                                    alt={category.name}
                                    style={styles.productImage}
                                />
                                <h2 style={styles.productName}>{category.name}</h2>
                                <p style={styles.productDescription}>{category.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <section style={styles.whySection}>
                <h2 style={styles.heading}>Why Use Cold Pressed Oil?</h2>
                <p style={styles.description}>
                    At Asalkar Healthy Hub, we are committed to providing you with the purest and most nutritious oils
                    for your everyday cooking. Our Cold-Pressed Oils are extracted using the traditional cold-pressing
                    method, which ensures that every drop is packed with essential nutrients, antioxidants, and
                    vitamins. Unlike refined oils, which are processed with chemicals and high heat, our cold-pressed
                    oils retain their natural flavor and nutritional value, making them a healthier and tastier choice
                    for your family. Rich in heart-healthy fats like omega-3 and omega-6 fatty acids, our oils are
                    perfect for maintaining a balanced diet while enhancing the taste of your dishes. Whether you’re
                    frying, sautéing, or making dressings, our oils are ideal for low to medium heat cooking and offer a
                    fresh, natural flavor. Plus, they are free from harmful chemicals and preservatives, giving you an
                    oil that is as pure and natural as nature intended. Available in sunflower oil, groundnut oil,
                    safflower oil, and coconut oil, each in sizes ranging from 500ml to 5 liters, our cold-pressed oils
                    are the perfect addition to any kitchen. Choose Asalkar Healthy Hub for a healthier, tastier, and
                    more sustainable way to cook.
                </p>
            </section>
        </main>
    );
};

const styles = {
    main: { padding: '20px', backgroundColor: '#f9f9f9' },
    heading: { textAlign: 'center', margin: '20px 0', fontSize: '24px', color: '#333' },
    productsSection: { marginBottom: '40px' },
    productsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
    },
    productCard: {
        width: '200px',
        textAlign: 'center',
        cursor: 'pointer',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    productCardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
    },
    productImage: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        margin: '0 auto 10px',
        border: '2px solid #ddd',
    },
    productName: { fontSize: '16px', color: '#333' },
    productDescription: { fontSize: '12px', color: '#666' },
    loading: { fontSize: '16px', textAlign: 'center', color: '#555' },
    error: { color: 'red', textAlign: 'center', fontSize: '14px' },
};

export default Home;
