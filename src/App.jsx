import axios from 'axios'; // librería para hacer peticiones HTTP
import './App.css';
import StatsPanel from './components/StatsPanel.jsx'; // Componente para mostrar estadísticas
import ProductList from './components/ProductList'; // lista de productos
import { useState, useEffect, useRef } from 'react'; // hooks de React para manejar estado y efectos secundarios
import ExportButtons from './components/ExportButtons'; // botones de exportación
import SearchBar from './components/SearchBar'; // barra de búsqueda
import React from 'react';

function App() {
  const [products, setProducts] = useState([]); // lista de productos
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState(""); // e.g. 'price-asc'
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const appRef = useRef();

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100') // API de productos
      .then(response => setProducts(response.data.products))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Función para cargar más productos (lazy loading)
  const loadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  // Función para exportar a JSON
  const exportJSON = () => {
    const dataStr = JSON.stringify(filteredProducts, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'productos_filtrados.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('Archivo JSON descargado');
  };

  // Función para exportar a CSV
  const exportCSV = () => {
    if (!filteredProducts.length) return;
    const keys = Object.keys(filteredProducts[0]);
    const csvRows = [
      keys.join(","), // encabezados
      ...filteredProducts.map(product =>
        keys.map(k => `"${String(product[k]).replace(/"/g, '""')}"`).join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "productos_filtrados.csv";
    a.click();
    URL.revokeObjectURL(url);
    alert("Archivo CSV descargado");
  };

  // Toggle modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (appRef.current) {
      appRef.current.classList.toggle("dark");
    }
  }; // <--- Aquí está la llave de cierre correcta

  // Extraer categorías únicas para filtro
  const uniqueCategories = [...new Set(products.map(p => p.category))].sort();

  // Filtrado inicial por búsqueda y categoría
  let filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "all" || p.category === categoryFilter)
  );

  // Ordenar por opción seleccionada
  if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating-asc") {
    filteredProducts.sort((a, b) => a.rating - b.rating);
  } else if (sortOption === "rating-desc") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  // Lazy loading: mostrar sólo los productos visibles
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <>
      <h1>Proyecto ABP: Procesamiento de datos con APIS REST</h1>
      <h1>Catálogo de Productos</h1>

      <div
        ref={appRef}
        className={`min-h-screen p-4 transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-3xl text-blue-600 font-bold">
          Práctica con Axios, Tailwind y Estadísticas
        </h2>

        <button
          onClick={toggleDarkMode}
          className="mb-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Modo {darkMode ? "claro" : "oscuro"}
        </button>

        <SearchBar
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
          uniqueCategories={uniqueCategories}
          productsLength={products.length}
        />

        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded mb-4 shadow"
          onClick={() => setShowStats(!showStats)}
        >
          {showStats ? "Ocultar estadísticas" : "Mostrar estadísticas"}
        </button>

        {showStats && <StatsPanel products={filteredProducts} />}
        <ProductList products={visibleProducts} />
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Cargar más productos
            </button>
          </div>
        )}

        <ExportButtons onExportJSON={exportJSON} onExportCSV={exportCSV} />
      </div>
    </>
  );
}

export default App;
