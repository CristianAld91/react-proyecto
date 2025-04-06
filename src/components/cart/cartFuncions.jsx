
class CartItem {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad; 
    }
}

const addToCart = (cartItems, product) => {
    if (!product.nombre || typeof product.precio !== 'number' || product.precio <= 0) {
        throw new Error("El producto debe tener un nombre y un precio válido.");
    }

    const newItem = new CartItem(product.id, product.nombre, product.precio, product.cantidad || 1); 
    const existingItem = cartItems.find(item => item.id === newItem.id);

    if (existingItem) {
        return cartItems.map(item =>
            item.id === newItem.id ? { ...item, cantidad: item.cantidad + newItem.cantidad } : item
        );
    }
    return [...cartItems, newItem];
};

const updateQuantity = (cartItems, id, quantity) => {
    if (typeof quantity !== 'number' || quantity < 0) {
        throw new Error("La cantidad debe ser un número positivo.");
    }

    if (quantity < 1) {
        return cartItems.filter(item => item.id !== id); // Elimina el item si la cantidad es menor a 1
    } else {
        return cartItems.map(item =>
            item.id === id ? { ...item, cantidad: quantity } : item
        );
    }
};

const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
};

// Nueva función para vaciar el carrito
const clearCart = () => {
    return []; // Reinicia el carrito
};

export { addToCart, updateQuantity, calculateTotal, CartItem, clearCart };
