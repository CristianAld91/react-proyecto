import React, { useState, useEffect } from 'react';
import { calculateTotal, clearCart } from '../cart/cartFuncions';
import { db } from '../../firebase/client';
import { collection, addDoc } from "firebase/firestore";
import CartButtons from '../checkout/addItemButton';

const ItemQualitySelector = ({ cartItems, setCartItems, updateQuantity }) => {
    // Registro para verificar props recibidas
    console.log("Props recibidas en ItemQualitySelector:", { cartItems, setCartItems, updateQuantity });

    const [cartOpen, setCartOpen] = useState(false);
    const [buyerName, setBuyerName] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Alternar la apertura del carrito
    const toggleCart = () => {
        setCartOpen(!cartOpen);
        console.log("Estado de cartOpen:", cartOpen);
    };

    const total = calculateTotal(cartItems);
    console.log("Total calculado:", total);

    // Manejar la compra
    const handlePurchase = async () => {
        if (buyerName && buyerEmail) {
            try {
                const orderData = {
                    buyerName,
                    buyerEmail,
                    items: cartItems.map(item => ({
                        id: item.id,
                        nombre: item.nombre,
                        cantidad: item.cantidad,
                        precio: item.precio,
                    })),
                    createdAt: new Date(),
                };

                await addDoc(collection(db, "orders"), orderData);
                setSnackbarMessage(`Compra realizada por: ${buyerName}`);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                // Vaciar el carrito después de la compra
                if (typeof setCartItems === "function") {
                    setCartItems(clearCart()); // Usar la función clearCart para vaciar el carrito
                    console.log("Carrito vacío tras la compra");
                } else {
                    console.error("Error: setCartItems no es una función válida.");
                }

                setBuyerName('');
                setBuyerEmail('');
            } catch (error) {
                console.error("Error al guardar la orden:", error);
                setSnackbarMessage('Hubo un error al procesar tu compra.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } else {
            setSnackbarMessage('Por favor, ingresa tu nombre y correo electrónico.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
        }
    };

    // Remover un ítem específico
    const removeItem = (itemId) => {
        if (typeof setCartItems === "function") {
            setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
            console.log(`Ítem con ID ${itemId} eliminado`);
        } else {
            console.error("Error: setCartItems no es una función válida.");
        }
    };

    // Vaciar el carrito
    const clearCartHandler = () => {
        if (typeof setCartItems === "function") {
            setCartItems(clearCart()); // Usar función clearCart para reiniciar el carrito
            console.log("Carrito vacío tras ejecutar clearCartHandler");
        } else {
            console.error("Error: setCartItems no es una función válida.");
        }
    };

    // Monitoriza cambios en cartItems
    useEffect(() => {
        console.log("Estado del carrito actualizado (useEffect):", cartItems);
    }, [cartItems]);

    return (
        <CartButtons
            removeItem={removeItem}
            clearCart={clearCartHandler}
            cartOpen={cartOpen}
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            handlePurchase={handlePurchase}
            toggleCart={toggleCart}
            total={total}
            buyerName={buyerName}
            setBuyerName={setBuyerName}
            buyerEmail={buyerEmail}
            setBuyerEmail={setBuyerEmail}
            snackbarOpen={snackbarOpen}
            setSnackbarOpen={setSnackbarOpen}
            snackbarMessage={snackbarMessage}
            snackbarSeverity={snackbarSeverity}
        />
    );
};

export default ItemQualitySelector;
