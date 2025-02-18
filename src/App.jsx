import React from 'react';
import NavBar from './assets/components/navbar/NavBar';
import './App.css';
import ItemListContainer from './assets/components/itemListContainer/ItemListContainer';
import { data } from './assets/components/itemListContainer/ArrayDeProductos'; 
import Card from './assets/components/itemListContainer/Card'; 
import './assets/components/itemListContainer/ItemListContainer.css'

function App() {
  return (
    <>
      <NavBar />
      <div className ="hero">
      <ItemListContainer greeting='a nuestra web' />
      </div>
      <div className="cardContainer">
        {data.map(celular => (
          <Card key={celular.id} celular={celular} />
        ))}
      </div>
    </>
  );
}

export default App;
