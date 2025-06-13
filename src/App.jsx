import axios from 'axios';
import './App.css';
import StatsPanel from './components/StatsPanel.jsx'; // componente para mostrar estadisticas
import ProductList from './components/ProductList'; // lista de productos
import { useState, useEffect, useRef } from 'react'; // hooks de react manejo de estados y efectos
import ExportButtons from './components/ExportButtons'; // bot de export
import SearchBar from './components/SearchBar'; // Barra de busqueda



function App() {
  const [products, setProducts] = useState([]); // lista de prod
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState(""); // e.g. 'price-asc'
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const appRef = useRef();
  

// 2 . FUNCION PARA CARGAR MAS PRODUCTOS (LAZY LOADING)
  const loadMore = () => {
  setVisibleCount(prev => prev + 10);
};

  //FUNCIONES DE EXPORTACION 
  // Exportar productos filtrados a JSON y CSV
  // Exportar productos filtrados a JSON

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
// Exportar productos filtrados a CSV
  const exportCSV = () => {
    if (!filteredProducts.length) return;

    const keys = Object.keys(filteredProducts[0]);
    //construir filas CSV contenido CSV
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
   axios.get('https://dummyjson.com/products?limit=100')
  .then(res => setProducts(res.data.products)) // ✅ Axios ya devuelve JSON
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
  //lazy loading
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

