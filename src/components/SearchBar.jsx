const SearchBar = ({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  sortOption,
  setSortOption,
  uniqueCategories,
  productsLength
}) => {
    return (
        <> 
        <input
          type="text"
          placeholder="Buscar producto..."
          className="border rounded px-3 py-2 my-4 w-full max-w-md dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Mostrar select solo si hay productos cargados */}
        {productsLength > 0 && (

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

        </>
    );
}; 

export default SearchBar;
