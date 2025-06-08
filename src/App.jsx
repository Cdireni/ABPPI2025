import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StatsPanel from './StatsPanel';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
   const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState(""); // e.g. 'price-asc'
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then((res) => {
        setProducts(res.data.products);
      });
  }, []);

  //extraer categorías únicas
  const uniqueCategories = [...new Set(products.map(p => p.category))].sort();

  // filtrado inicial por búsqueda y categoría

 let filteredProducts = products.filter(p => 
  p.title.toLowerCase().includes(search.toLowerCase()) &&
  (categoryFilter === "all" || p.category === categoryFilter)
);

//ordenar por opciones

 if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating-asc") {
    filteredProducts.sort((a, b) => a.rating - b.rating);
  } else if (sortOption === "rating-desc") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }


  return (
    <>
      <h1>Proyecto ABP: Procesamiento de datos con APIS REST</h1>
      <h1>Catálogo de Productos</h1>

      <div className={`min-h-screen p-4 transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <h2 className="text-3xl text-blue-600 font-bold">Práctica con Axios, Tailwind y Estadísticas</h2>

        <button onClick={toggleDarkMode} className="mb-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
          Modo {darkMode ? "claro" : "oscuro"}
        </button>

        <input
          type="text"
          placeholder="Buscar producto..."
          className="border rounded px-3 py-2 my-4 w-full max-w-md dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Mostrar select solo si hay productos cargados */}
        {products.length > 0 && (

        <select 
          className="border rounded px-3 py-2 mr-4 mb-4 dark:bg-gray-800 dark:text-white"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          {["all",...uniqueCategories].map(cat => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Todas las categorías" : cat}
            </option>
          ))}
        </select>
        )}

        {/* selección para ordenamiento */}
        <select
          className="border rounded px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white"
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="">Ordenar por</option>
          <option value="price-asc">Precio ascendente</option>
          <option value="price-desc">Precio descendente</option>
          <option value="rating-asc">Rating ascendente</option>
          <option value="rating-desc">Rating descendente</option>
        </select>


        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded mb-4 shadow"
          onClick={() => setShowStats(!showStats)}
        >
          {showStats ? "Ocultar estadísticas" : "Mostrar estadísticas"}
        </button>

        {showStats && <StatsPanel products={filteredProducts} />}
        <ProductList products={filteredProducts} />
      </div>
    </>
  );
}

export default App;

