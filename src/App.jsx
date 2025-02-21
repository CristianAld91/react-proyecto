import React from 'react';
import NavBar from './assets/components/navbar/NavBar';
import './App.css';
import ItemListContainer from './assets/components/itemListContainer/ItemListContainer';
import Card from './assets/components/itemListContainer/ItemList'; 
import './assets/components/itemListContainer/ItemListContainer.css'
import ItemList from './assets/components/itemListContainer/ItemList';

function App() {
  return (
    <>
      <NavBar />
      <div className ="hero">
      <ItemListContainer greeting='a nuestra web' />
      </div>
      <div className="cardContainer">
       <ItemList/>
      </div>
    </>
  );
}

export default App;
