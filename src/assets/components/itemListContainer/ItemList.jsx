import React, { useEffect, useState } from 'react';

const ItemList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const miPromesa = new Promise((resolve, reject) => { 
    const products = [ 
      {
        id: 1,
        nombre: "Samsung Galaxy S25",
        precio: 999,
        descripcion: "La última versión de la serie Galaxy S, con mejoras en la cámara y rendimiento.",
        stock: 30,
        nuevaColeccion: true,
        imagenes: {
            imgProducto: "src/assets/img/s25.png"
        },
      },
      {
        id: 2,
        nombre: "iPhone 15",
        precio: 1099,
        descripcion: "El nuevo modelo de Apple, con mejoras en la duración de la batería y capacidades de fotografía.",
        stock: 20,
        nuevaColeccion: true,
        imagenes: {
            imgProducto: "src/assets/img/iphone15.png"
        },
      }
    ];

    setTimeout(() => {
      products.length > 0 ? resolve(products) : reject('No hay productos que mostrar');
    }, 2000); // Simulando un retraso de 2 segundos
  });

  useEffect(() => {
    miPromesa
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="cardContainer">
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        data.map(celular => (
          <div className="card" key={celular.id}>
            <img src={celular.imagenes.imgProducto} alt={celular.nombre} className='imgProduct'/>
            <h2>{celular.nombre}</h2>
            <p>{celular.descripcion}</p>
            <p className='precio'>Precio: ${celular.precio}</p>
            <p>Stock: {celular.stock}</p>
            <button>Agregar al carrito</button>
            <button>+</button>
            <button>-</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ItemList;
