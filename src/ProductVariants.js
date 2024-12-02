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
    const [hoveredImage, setHoveredImage] = useState(null); // Track hovered image for zoom

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
                if (data.length > 0) {
                    const initialQuantities = data.reduce((acc, { variantId, stockQuantity = 1 }) => {
                        acc[variantId] = Math.min(1, stockQuantity); // Start with 1, clamped to stockQuantity
                        return acc;
                    }, {});
                    setQuantities(initialQuantities);
                }
            } catch (error) {
                console.error('Error fetching variants:', error);
                setError('Failed to load product variants. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchVariants();
    }, [productId]);

    const handleMouseEnter = (variantId) => {
        setHoveredImage(variantId); // Set hovered image ID
    };

    const handleMouseLeave = () => {
        setHoveredImage(null); // Reset hovered image
    };

    const handleMouseMove = (e, imageRef) => {
        if (!imageRef) return;

        const { left, top, width, height } = imageRef.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100; // Calculate x percentage
        const y = ((e.pageY - top) / height) * 100; // Calculate y percentage

        // Apply zoom effect to a new div
        setZoomStyle({
            backgroundImage: `url(${imageRef.src})`,
            backgroundPosition: `${x}% ${y}%`,
            backgroundSize: `${width * 3}px ${height * 3}px`, // Increased zoom for clarity
            display: 'block',
        });
    };

    const [zoomStyle, setZoomStyle] = useState(null); // For zoom effect

    const handleQuantityChange = (variantId, value) => {
        const parsedValue = parseInt(value, 10); // Parse the input to ensure it's an integer

        if (isNaN(parsedValue)) return; // Ignore invalid input

        // Helper function to get clamped value
        const getClampedValue = (value, min, max) => Math.min(Math.max(value, min), max);

        // Find the variant to get its stock quantity
        const variant = variants.find((v) => v.variantId === variantId);
        const stockLimit = variant?.stockQuantity || 1;

        // Update the state
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [variantId]: getClampedValue(parsedValue, 1, stockLimit),
        }));
    };

    if (loading) {
        return <p style={styles.loading}>Loading product variants...</p>;
    }

    return (
        <div style={styles.container}>
            <button style={styles.backButton} onClick={() => navigate("/")}>
                Back to Products
            </button>
            <div style={styles.variantsContainer}>
                {error ? (
                    <p style={styles.error}>{error}</p>
                ) : variants.length > 0 ? (
                    variants.map((variant) => (
                        <div key={variant.variantId} style={styles.variantCard}>
                            <div
                                style={styles.imageWrapper}
                                onMouseEnter={() => handleMouseEnter(variant.variantId)}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={(e) =>
                                    hoveredImage === variant.variantId
                                        ? handleMouseMove(e, e.target)
                                        : null
                                }
                            >
                                <img
                                    src={`data:image/jpeg;base64,${variant.image}`}
                                    alt={variant.name}
                                    style={styles.variantImage}
                                />
                                {hoveredImage === variant.variantId && zoomStyle && (
                                    <div style={{ ...styles.zoomLens, ...zoomStyle }} />
                                )}
                            </div>
                            <div style={styles.variantDetails}>
                                <h3 style={styles.variantName}>{variant.product.name}</h3>
                                <h3 style={styles.variantName}>{variant.description}</h3>
                                <p style={styles.variantDescription}>{variant.quantity}</p>
                                <p style={styles.variantPrice}>Price: ₹{variant.price}</p>
                                <p style={styles.variantStock}>
    {variant.stockQuantity > 1 ? "In Stock:"+variant.stockQuantity : "Not in Stock"}
</p>

                                <div style={styles.quantityContainer}>
                                    <button
                                        style={styles.quantityButton}
                                        onClick={() =>
                                            handleQuantityChange(variant.variantId, quantities[variant.variantId] - 1)
                                        }
                                        disabled={quantities[variant.variantId] <= 1}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        style={styles.quantityInput}
                                        value={quantities[variant.variantId]}
                                        onChange={(e) => handleQuantityChange(variant.variantId, e.target.value)}
                                    />
                                    <button
                                        style={styles.quantityButton}
                                        onClick={() =>
                                            handleQuantityChange(variant.variantId, quantities[variant.variantId] + 1)
                                        }
                                        disabled={quantities[variant.variantId] >= variant.stockQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    style={styles.addToCartButton}
                                    onClick={() => addToCart({ ...variant, quantity: quantities[variant.variantId] })}
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
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        position: 'relative', // To position the back button relative to the container
    },
    backButton: {
        position: 'absolute',
        top: '20px', // Adjust to place the button closer to the top
        left: '20px', // Align the button to the left corner
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 10, // Make sure the back button is above other content
    },
    variantsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '50px', // Increased gap between product variants
        padding: '20px',
    },
    variantCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%', // Increased the width to fill more space
        maxWidth: '2250px', // Increased max-width to make the card bigger
        padding: '30px', // Increased padding
        backgroundColor: '#fff',
        borderRadius: '12px', // Slightly larger border radius for a smoother look
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', // Increased box shadow for a more prominent effect
        textAlign: 'left',
        marginBottom: '50px', // Increased margin between variant cards
    },
    imageWrapper: {
        position: 'relative',
        width: '50%', // Increased width of image wrapper to take up more space
        height: '500px', // Increased height of image wrapper
        overflow: 'hidden',
        borderRadius: '12px', // Border radius for smoother edges
    },
    variantImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        cursor: 'zoom-in',
        transition: 'transform 0.3s ease',
    },
    zoomLens: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        zIndex: 10,
        pointerEvents: 'none',
        display: 'none',
    },
    variantDetails: {
        width: '45%', // Adjusted width of details section to accommodate larger image
        paddingLeft: '30px', // Added more space between image and text
    },
    variantName: {
        fontSize: '28px', // Increased font size for name
        marginBottom: '20px', // Increased margin to separate elements
        color: '#333',
    },
    variantDescription: {
        fontSize: '18px', // Increased font size for description
        color: '#555',
        marginBottom: '20px',
    },
    variantPrice: {
        fontSize: '24px', // Increased font size for price
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: '20px',
    },
    variantStock: {
        fontSize: '18px', // Increased font size for stock information
        color: '#666',
    },
    quantityContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px', // Increased gap between quantity buttons and input
        marginTop: '20px', // Increased top margin for spacing
    },
    quantityButton: {
        width: '50px', // Increased button size
        height: '50px', // Increased button size
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px', // Increased font size for readability
        borderRadius: '6px', // Smoother button edges
    },
    quantityInput: {
        width: '80px', // Increased width for input field
        height: '50px', // Increased height for input field
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '24px', // Increased font size for readability
        padding: '0',
    },
    addToCartButton: {
        marginTop: '20px',
        padding: '15px 30px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '20px',
    },
    loading: {
        fontSize: '20px',
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
