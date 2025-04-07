# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# README

## Descripción del Proyecto

Este proyecto es una aplicación web construida con **React** que permite a los usuarios navegar por diferentes categorías de productos, ver detalles de cada producto y agregar artículos a un carrito de compras. Utiliza **React Router** para la navegación entre diferentes componentes.

## Estructura del Código

### Componentes Principales

1. **NavBar**: 
   - Muestra el estado del carrito y permite al usuario alternar la visibilidad del mismo.
   - Recibe `cartItems`, `setCartItems`, `updateQuantity`, y una función para alternar la visibilidad del carrito como props.

2. **ItemListContainer**: 
   - Muestra una lista de productos. Puede recibir una función `addToCart` para agregar productos al carrito.

3. **ItemDetailContainer**: 
   - Muestra los detalles de un producto específico. También recibe `addToCart` como prop.

4. **ItemQualitySelector**:
   - Permite a los usuarios seleccionar la cantidad de un producto en el carrito. Se renderiza solo cuando el carrito es visible.

### Estado y Funciones

- **Estado del Carrito**:
  - Se define un estado `cartItems` para almacenar los productos en el carrito.
  - `showCart` controla la visibilidad del carrito.

- **Funciones**:
  - `handleAddToCart`: Agrega un producto al carrito utilizando la función `addToCart`.
  - `handleUpdateQuantity`: Actualiza la cantidad de un producto en el carrito utilizando la función `updateQuantity`.
  - `calculateTotal`: Calcula el total del carrito a partir de los productos en `cartItems`.

### Rutas

La aplicación utiliza **React Router** para manejar la navegación entre diferentes vistas:

- **Página Principal** (`/`): Muestra la lista de productos.
- **Categorías**: Permite navegar a diferentes categorías de productos (por ejemplo, tablets y celulares).
- **Detalles de Ítems**: Muestra información detallada de un producto específico.

## Ejemplo de Uso

1. Al cargar la aplicación, el usuario puede ver la lista de productos en la página principal.
2. Al seleccionar un producto, se puede ver más información en la página de detalles.
3. Desde el componente `NavBar`, el usuario puede alternar la visibilidad del carrito.
4. Al agregar productos al carrito, se pueden seleccionar cantidades mediante `ItemQualitySelector`.

## Conclusión

Este proyecto es un ejemplo básico de cómo construir una aplicación de comercio electrónico utilizando **React**, gestionando el estado del carrito y la navegación de manera efectiva.
