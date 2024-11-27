import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

const ProductVariants = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [variants, setVariants] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchVariants = async () => {
            try {
                const response = await fetch(`http://localhost:9090/productvariants/${productId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setVariants(data);

                // Initialize quantities
                const initialQuantities = data.reduce((acc, variant) => {
                    acc[variant.variant_id] = 1;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            } catch (error) {
                console.error('Error fetching variants:', error);
                setError('Failed to load product variants. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchVariants();
    }, [productId]);

    const handleQuantityChange = (variantId, value) => {
        const parsedValue = Number(value);
        if (isNaN(parsedValue)) return; // Ignore invalid input
    
        setQuantities((prev) => ({
            ...prev,
            [variantId]: Math.min(
                Math.max(parsedValue, 1), // Clamp value to be at least 1
                variants.find((v) => v.variant_id === variantId)?.stockQuantity || 1 // Clamp to stock limit
            ),
        }));
    };
    
    useEffect(() => {
        const initialQuantities = variants.reduce((acc, variant) => {
            acc[variant.variant_id] = 1; // Default quantity to 1
            return acc;
        }, {});
        setQuantities(initialQuantities);
    }, [variants]);
    

    if (loading) {
        return <p style={styles.loading}>Loading product variants...</p>;
    }

    return (
        <div>
            <button style={styles.backButton} onClick={() => navigate(-1)}>
                Back to Products
            </button>
            <div style={styles.variantsContainer}>
                {error ? (
                    <p style={styles.error}>{error}</p>
                ) : variants.length > 0 ? (
                    variants.map((variant) => (
                        <div key={variant.variant_id} style={styles.variantCard}>
                            <img
                                src={`data:image/jpeg;base64,${variant.image}`}
                                alt={variant.name}
                                style={styles.variantImage}
                            />
                            <h3 style={styles.variantName}>{variant.name}</h3>
                            <p style={styles.variantDescription}>{variant.quantity}</p>
                            <p style={styles.variantPrice}>Price: ₹{variant.price}</p>
                            <p style={styles.variantStock}>Stock: {variant.stockQuantity}</p>
                            <div style={styles.quantityContainer}>
        <button
            style={styles.quantityButton}
            onClick={() => handleQuantityChange(variant.variant_id, quantities[variant.variant_id] - 1)}
            disabled={quantities[variant.variant_id] <= 1} // Disable if at minimum
        >
            -
        </button>
        <input
            type="text"
            style={styles.quantityInput}
            value={quantities[variant.variant_id]}
            onChange={(e) => handleQuantityChange(variant.variant_id, e.target.value)}
        />
        <button
            style={styles.quantityButton}
            onClick={() => handleQuantityChange(variant.variant_id, quantities[variant.variant_id] + 1)}
            disabled={quantities[variant.variant_id] >= variant.stockQuantity} // Disable if at max
        >
            +
        </button>
    </div>
                            <button
                                style={styles.addToCartButton}
                                onClick={() => addToCart({ ...variant, quantity: quantities[variant.variant_id] })}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No variants available for this product.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    variantsContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '30px',
        padding: '20px',
    },
    backButton: {
        marginBottom: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    variantCard: {
        width: '300px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    variantImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '10px',
        marginBottom: '15px',
    },
    variantName: {
        fontSize: '18px',
        margin: '10px 0',
        color: '#333',
    },
    variantDescription: {
        fontSize: '14px',
        color: '#555',
        marginBottom: '10px',
    },
    variantPrice: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#28a745',
    },
    variantStock: {
        fontSize: '14px',
        color: '#666',
    },
    quantityContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginTop: '15px',
    },
    quantityInput: {
        width: '60px',
        padding: '5px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    quantityButton: {
        padding: '5px 10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    addToCartButton: {
        marginTop: '15px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    loading: {
        fontSize: '18px',
        color: '#555',
        textAlign: 'center',
        marginTop: '20px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
};

export default ProductVariants;
