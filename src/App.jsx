import axios from 'axios';
import './App.css';
import StatsPanel from './components/StatsPanel.jsx';
import ProductList from './components/ProductList';
import { useState, useEffect } from 'react';
import ExportButtons from './components/ExportButtons';



function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState(""); // e.g. 'price-asc'
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

 
  const loadMore = () => {
  setVisibleCount(prev => prev + 10);
};


   const exportJSON = () => {
    const dataStr = JSON.stringify(filteredProducts, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'productos_filtrados.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('Archivo JSON descargado');
  };

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
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

    useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  //extraer categorías únicas
  const uniqueCategories = [...new Set(products.map(p => p.category))].sort(); //para renderizar opc de cat

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
  //azy loading
  const visibleProducts = filteredProducts.slice(0, visibleCount);

 
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
          onChange={e => setSearch(e.target.value)} //como callback del evento
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

