import React, { useEffect, useState } from 'react';

const ProductVariants = ({ productId, onBack }) => {
    const [variants, setVariants] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchVariants = async () => {
            try {
                const response = await fetch(`http://10.210.5.150:9090/productvariants/${productId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
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
        setQuantities((prev) => ({
            ...prev,
            [variantId]: Math.min(
                Math.max(Number(value), 1),
                variants.find((v) => v.variant_id === variantId)?.stock_quantity || 1
            ),
        }));
    };

    const handleAddToCart = (variantId) => {
        const variant = variants.find((v) => v.variant_id === variantId);
        const quantity = quantities[variantId] || 1;
        console.log(`Added to cart: ${variant.name}, Quantity: ${quantity}`);
        // Add cart logic here
    };

    if (loading) {
        return <p style={styles.loading}>Loading product variants...</p>;
    }

    return (
        <>
            <div>
                <button style={styles.backButton} onClick={onBack}>
                    Back to Products
                </button>
            </div>
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
                            <p style={styles.variantDescription}>{variant.description}</p>
                            <p style={styles.variantPrice}>Price: ₹{variant.price}</p>
                            <p style={styles.variantStock}>Stock: {variant.stock_quantity}</p>
                            <div style={styles.quantityContainer}>
                                <input
                                    type="number"
                                    style={styles.quantityInput}
                                    value={quantities[variant.variant_id]}
                                    min="1"
                                    max={variant.stock_quantity}
                                    onChange={(e) => handleQuantityChange(variant.variant_id, e.target.value)}
                                />
                                <button
                                    style={styles.addToCartButton}
                                    onClick={() => handleAddToCart(variant.variant_id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No variants available for this product.</p>
                )}
            </div>
        </>
    );
};


const styles = {
    variantsContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
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
        width: '250px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    variantImage: {
        width: '100%',
        height: '150px',
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15px',
    },
    quantityInput: {
        width: '60px',
        padding: '5px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    addToCartButton: {
        padding: '5px 10px',
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
