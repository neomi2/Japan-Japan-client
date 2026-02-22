const BASE_URL = "http://localhost:3000/orders";

// Function to delete an order
// Authorized for Admin or the Client who placed the order
export const removeOrder = async (orderId, userID, isAdmin) => {
    try {
        const response = await fetch(`${BASE_URL}/${orderId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            // Sending userID and isAdmin to match server-side requirements
            body: JSON.stringify({ userID, isAdmin })
        });
        return await response.json();
    } catch (err) {
        // Log error if the request fails
        console.error("Error deleting order:", err);
        throw err;
    }
};

// Function to update order status to sent
// Authorized for ADMIN only
export const markOrderSent = async (orderId, isAdmin) => {
    try {
        const response = await fetch(`
            ${BASE_URL}/${orderId}
            `
            , {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // Sending isAdmin: true to pass the admin check in the controller
            body: JSON.stringify({ isAdmin })
        });
        return await response.json();
    } catch (err) {
        // Log error if the update fails
        console.error("Error updating order:", err);
        throw err;
    }
};
