import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedItems } = location.state || { selectedItems: [] }; // Get selected items

    console.log(selectedItems);

    const handleConfirmOrder = async () => {
        try {
            // Check stock availability
            const stockCheckResults = await Promise.all(
                selectedItems.map(async (item) => {
                    const response = await fetch(`http://localhost:9090/checkStock/${item.variantId}`);
                    const stockData = await response.json();
                    return { ...item, availableStock: stockData.stockQuantity };
                })
            );

            // Check for insufficient stock
            const insufficientStockItems = stockCheckResults.filter(
                (item) => item.quantity > item.availableStock
            );

            if (insufficientStockItems.length > 0) {
                // Notify user about insufficient stock
                alert(
                    `The following items are out of stock or exceed the available quantity:\n` +
                    insufficientStockItems
                        .map(
                            (item) =>
                                `${item.product.name}: Ordered ${item.quantity}, Available ${item.availableStock}`
                        )
                        .join('\n')
                );
                return; // Stop further processing
            }

            // Proceed with confirming the order and updating the stock
            await Promise.all(
                stockCheckResults.map(async (item) => {
                    await fetch(`http://localhost:9090/updateStock/${item.variantId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ stockQuantity: item.quantity }),
                    });
                })
            );

            alert('Order Confirmed!');
            navigate('/cart', { state: { updatedItems: selectedItems } }); // Navigate back to cart
        } catch (error) {
            console.error('Failed to confirm order:', error);
            alert('Failed to confirm the order. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Order Confirmation</h2>
            <ul style={styles.itemList}>
                {selectedItems.map((item) => (
                    <li key={item.variantId} style={styles.item}>
                        {item.product.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
            <button style={styles.confirmButton} onClick={handleConfirmOrder}>
                Confirm Order
            </button>
            <button style={styles.cancelButton} onClick={() => navigate('/cart')}>
                Cancel
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    itemList: {
        listStyleType: 'none',
        padding: 0,
        marginBottom: '20px',
    },
    item: {
        fontSize: '18px',
        marginBottom: '10px',
        color: '#555',
    },
    confirmButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default OrderConfirmation;
