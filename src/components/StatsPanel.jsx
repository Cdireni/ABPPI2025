function StatsPanel({ products }) {
  if (!products || products.length === 0) return null;

  // Estadísticas generales
  const masCaro = products.reduce((max, p) => (p.price > max.price ? p : max), products[0]);
  const masBarato = products.reduce((min, p) => (p.price < min.price ? p : min), products[0]);
  const titulosLargos = products.filter(p => p.title.length > 20).length;
  const precioTotal = products.reduce((sum, p) => sum + p.price, 0);
  const promedioDescuento = (products.reduce((sum, p) => sum + p.discountPercentage, 0) / products.length).toFixed(2);
  const precioPromedio = (precioTotal / products.length).toFixed(2);

  const stockMayor50 = products.filter(p => p.stock > 50).length;
  const ratingMayor45 = products.filter(p => p.rating > 4.5).length;

  // Agrupar por categoría
  const categorias = {};

  products.forEach(p => {
    if (!categorias[p.category]) {
      categorias[p.category] = {
        productos: [],
        totalPrecio: 0,
        totalRating: 0,
        masCaro: p,
        masBarato: p,
      };
    }

    categorias[p.category].productos.push(p);
    categorias[p.category].totalPrecio += p.price;
    categorias[p.category].totalRating += p.rating;

    if (p.price > categorias[p.category].masCaro.price) {
      categorias[p.category].masCaro = p;
    }

    if (p.price < categorias[p.category].masBarato.price) {
      categorias[p.category].masBarato = p;
    }
  });

  return (
    <div className="my-8 p-4 bg-gray-100 rounded shadow text-left max-w-xl mx-auto transition-opacity duration-500 animate-fade-in dark:bg-gray-800 dark:text-white">
      <h3 className="text-2xl font-semibold mb-4">Estadísticas</h3>
      <ul className="list-disc pl-6 text-lg">
        <li><strong>Producto más caro:</strong> {masCaro.title} (${masCaro.price})</li>
        <li><strong>Producto más barato:</strong> {masBarato.title} (${masBarato.price})</li>
        <li><strong>Productos con título &gt; 20 caracteres:</strong> {titulosLargos}</li>
        <li><strong>Precio total de todos los productos:</strong> ${precioTotal}</li>
        <li><strong>Precio promedio:</strong> ${precioPromedio}</li>
        <li><strong>Promedio de descuento (%):</strong> {promedioDescuento}%</li>
        <li><strong>Productos con stock &gt; 50:</strong> {stockMayor50}</li>
        <li><strong>Productos con rating &gt; 4.5:</strong> {ratingMayor45}</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">Por categoría</h3>
      <ul className="list-disc pl-6">
        {Object.entries(categorias).map(([categoria, data]) => {
          const cantidad = data.productos.length;
          const promedioPrecio = (data.totalPrecio / cantidad).toFixed(2);
          const promedioRating = (data.totalRating / cantidad).toFixed(2);
          return (
            <li key={categoria} className="mb-2">
              <strong>{categoria}</strong>:<br />
              - Cantidad de productos: {cantidad}<br />
              - Precio promedio: ${promedioPrecio}<br />
              - Rating promedio: {promedioRating}<br />
              - Más caro: {data.masCaro.title} (${data.masCaro.price})<br />
              - Más barato: {data.masBarato.title} (${data.masBarato.price})
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StatsPanel;
