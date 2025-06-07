import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StatsPanel from './StatsPanel';
import ProductList from './ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showStats, setShowStats] = useState(false);


  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then((res) => {
        setProducts(res.data.products);
      });
  }, []);

  // Filtrado de productos según búsqueda
  const filteredProducts = search.trim() === ""
    ? products
    : products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <h1>Proyecto ABP: Procesamiento de datos con APIS REST</h1>
      <h1>Catálogo de Productos</h1>
      <h2 className="text-3xl text-blue-600 font-bold">Práctica con Axios, Tailwind y Estadísticas</h2>
      <input
        type="text"
        placeholder="Buscar producto..."
        className="border rounded px-3 py-2 my-4 w-full max-w-md"
        value={search}
        onChange={e => setSearch(e.target.value)}
    />
    
    <button
     className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded mb-4 shadow"
    onClick={() => setShowStats(!showStats)}>{showStats ? "Ocultar estadísticas" : "Mostrar estadísticas"}
    </button>

      {showStats && <StatsPanel products={filteredProducts} />}
      <ProductList products={filteredProducts} />
    </>
  );
}

export default App;
