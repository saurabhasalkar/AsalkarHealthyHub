import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
    const { cart, setCart } = useContext(CartContext); // Using CartContext to get cart and setCart
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectItem = (productId) => {
        // Toggle the selection of the current product
        setSelectedItems(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId); // Deselect item
            } else {
                return [...prev, productId]; // Select item
            }
        });
    };

    const handleRemoveSelected = () => {
        // Remove items from the cart that are selected
        setCart(prevCart => prevCart.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]); // Clear selection after removing items
    };

    const handleRemoveItem = (productId) => {
        // Remove a single item from the cart
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const handleCheckoutSelected = () => {
        // Handle checkout for selected items (can later be linked to a checkout flow)
        console.log('Proceeding to checkout for items:', selectedItems);
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleQuantityChange = (productId, quantity) => {
        const newQuantity = Math.max(Number(quantity), 1); // Ensure quantity can't be less than 1
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <div style={styles.cartContainer}>
            <h2 style={styles.cartTitle}>Your Cart</h2>
            {cart.length > 0 ? (
                <div>
                    <div style={styles.cartHeader}>
                        <span style={styles.selectAll}>
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedItems(cart.map(item => item.id)); // Select all items
                                    } else {
                                        setSelectedItems([]); // Deselect all items
                                    }
                                }}
                                checked={selectedItems.length === cart.length}
                            />
                            Select All
                        </span>
                        <div style={styles.cartActions}>
                            <button style={styles.actionButton} onClick={handleRemoveSelected}>Remove Selected</button>
                            <button style={styles.actionButton} onClick={handleCheckoutSelected}>Checkout Selected</button>
                        </div>
                    </div>

                    {cart.map(item => (
                        <div key={item.id} style={styles.cartItem}>
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleSelectItem(item.id)}
                                style={styles.checkbox}
                            />
                            <img
                                src={`data:image/jpeg;base64,${item.image}`}
                                alt={item.name}
                                style={styles.cartImage}
                            />
                            <div style={styles.cartDetails}>
                                <h4 style={styles.productName}>{item.name}</h4>
                                <p style={styles.productPrice}>Price: ₹{item.price}</p>
                                <div style={styles.quantityContainer}>
                                    <label>Quantity:</label>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        style={styles.quantityInput}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                    />
                                </div>
                                <button style={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>Remove</button>
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
    selectAll: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
    },
    cartActions: {
        display: 'flex',
        gap: '10px',
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
        marginTop: '10px',
    },
    quantityInput: {
        width: '60px',
        padding: '5px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginLeft: '10px',
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
    cartTotal: {
        marginTop: '30px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
    },
};

export default Cart;
