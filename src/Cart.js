import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if navigating back with updated items to apply the "Buy Again" tag
        const updatedItems = location.state?.updatedItems || [];
        if (updatedItems.length > 0) {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    updatedItems.includes(item.variantId) ? { ...item, buyAgain: true } : item
                )
            );
        }
    }, [location.state, setCart]);

    const handleSelectItem = (productvariantId) => {
        setSelectedItems((prev) =>
            prev.includes(productvariantId)
                ? prev.filter((id) => id !== productvariantId) // Deselect
                : [...prev, productvariantId] // Select
        );
    };

    const handleQuantityChange = (productvariantId, change) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.variantId === productvariantId
                    ? {
                        ...item,
                        quantity: Math.max(1, Math.min(item.quantity + change, item.stockQuantity)),
                    }
                    : item
            )
        );
    };

    const handleRemoveItem = (productvariantId) => {
        setCart((prevCart) => prevCart.filter((item) => item.variantId !== productvariantId));
        setSelectedItems((prev) => prev.filter((id) => id !== productvariantId));
    };

    const handleCheckoutSelected = () => {
        const selectedItemsDetails = cart.filter((item) => selectedItems.includes(item.variantId));
        if (selectedItemsDetails.length === 0) {
            alert('Please select items to checkout.');
            return;
        }

        // Navigate to OrderConfirmation with selected items
        navigate('/order-confirmation', { state: { selectedItems: selectedItemsDetails } });
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div style={styles.cartContainer}>
            <h2 style={styles.cartTitle}>Your Cart</h2>
            {cart.length > 0 ? (
                <div>
                    <div style={styles.cartHeader}>
                        <button
                            style={{
                                ...styles.actionButton,
                                backgroundColor: selectedItems.length > 0 ? '#007bff' : '#ccc',
                                cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                            }}
                            onClick={handleCheckoutSelected}
                            disabled={selectedItems.length === 0}
                        >
                            Checkout Selected
                        </button>
                    </div>

                    {cart.map((item) => (
                        <div key={item.variantId} style={styles.cartItem}>
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.variantId)}
                                onChange={() => handleSelectItem(item.variantId)}
                                style={styles.checkbox}
                            />
                            <img
                                src={`data:image/jpeg;base64,${item.image}`}
                                alt={item.product.name}
                                style={styles.cartImage}
                            />
                            <div style={styles.cartDetails}>
                                <h4 style={styles.productName}>{item.product.name}</h4>
                                <p style={styles.productPrice}>Price: ₹{item.price}</p>
                                <div style={styles.quantityContainer}>
                                    <button
                                        style={styles.quantityButton}
                                        onClick={() => handleQuantityChange(item.variantId, -1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span style={styles.quantityDisplay}>{item.quantity}</span>
                                    <button
                                        style={styles.quantityButton}
                                        onClick={() => handleQuantityChange(item.variantId, 1)}
                                        disabled={item.quantity >= item.stockQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                                {item.buyAgain && <span style={styles.buyAgainTag}>Buy Again</span>}
                                <button
                                    style={styles.removeButton}
                                    onClick={() => handleRemoveItem(item.variantId)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div style={styles.cartTotal}>
                        <h3>Total: ₹{totalAmount}</h3>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

const styles = {
    cartContainer: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    cartTitle: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    cartHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    actionButton: {
        padding: '8px 16px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    cartItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    checkbox: {
        marginRight: '15px',
    },
    cartImage: {
        width: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    cartDetails: {
        flex: 1,
        paddingLeft: '20px',
    },
    productName: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    productPrice: {
        fontSize: '16px',
        color: '#28a745',
    },
    quantityContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px',
    },
    quantityButton: {
        width: '30px',
        height: '30px',
        border: '1px solid #ccc',
        backgroundColor: '#f8f9fa',
        cursor: 'pointer',
        fontSize: '18px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
    },
    quantityDisplay: {
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        minWidth: '30px',
    },
    removeButton: {
        marginTop: '10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    buyAgainTag: {
        marginTop: '10px',
        color: '#007bff',
        fontWeight: 'bold',
    },
    cartTotal: {
        marginTop: '30px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
    },
};

export default Cart;
