import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
    const [productCategories, setProductCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
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
                setError('We encountered an issue while loading our product categories. Please refresh the page or try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/productvariants/${productId}`);
    };

    return (
        <main className="home-main">
            <section className="products-section">
                <h1 className="heading">Explore Our Product Categories</h1>
                {loading ? (
                    <p className="loading">Fetching the best for you...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <div className="products-container">
                        {productCategories.map((category) => (
                            <div
                                key={category.id}
                                className="product-card"
                                onClick={() => handleProductClick(category.id)}
                                role="button"
                                tabIndex="0"
                                aria-label={`View products in ${category.name}`}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') handleProductClick(category.id);
                                }}
                            >
                                <img
                                    src={`data:image/jpeg;base64,${category.image}`}
                                    alt={category.name}
                                    className="product-image"
                                />
                                <h2 className="product-name">{category.name}</h2>
                                <p className="product-description">{category.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <section className="why-section">
                <h2 className="heading">Why Choose Our Cold-Pressed Oils?</h2>
                <p className="description">
                    At **Asalkar Healthy Hub**, we pride ourselves on delivering premium, unrefined cold-pressed oils tailored to your health and culinary needs. Our oils are crafted using traditional cold-pressing techniques, ensuring that essential nutrients, antioxidants, and vitamins remain intact.
                </p>
                <p className="description">
                    Perfect for low to medium heat cooking, our oils enhance your meals with natural goodness and taste. Rich in omega-3 and omega-6 fatty acids, they support a balanced diet while elevating your culinary creations. Available in variants like sunflower, groundnut, safflower, and coconut oil, our products cater to diverse preferences and sizes from 500ml to 5 liters.
                </p>
                <p className="description">
                    Choose Asalkar Healthy Hub for quality you can trust, a healthier lifestyle, and flavors that stand out.
                </p>
            </section>
        </main>
    );
};

export default Home;
