// Componente funcional para mostrar estadísticas
function StatsPanel({ products }) {
  if (!products || products.length === 0) return null;

  const masCaro = products.reduce((max, p) => p.price > max.price ? p : max, products[0]);
  const masBarato = products.reduce((min, p) => p.price < min.price ? p : min, products[0]);
  const titulosLargos = products.filter(p => p.title.length > 20).length;
  const precioTotal = products.reduce((sum, p) => sum + p.price, 0);
  const promedioDescuento = (products.reduce((sum, p) => sum + p.discountPercentage, 0) / products.length).toFixed(2);

  return (
    <div className="my-8 p-4 bg-gray-100 rounded shadow text-left max-w-xl mx-auto transition-opacity duration-500 animate-fade-in">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Estadísticas</h3>
      <ul className="list-disc pl-6 text-lg text-gray-700">
        <li>
          <span className="font-bold">Producto más caro:</span> {masCaro.title} (${masCaro.price})
        </li>
        <li>
          <span className="font-bold">Producto más barato:</span> {masBarato.title} (${masBarato.price})
        </li>
        <li>
          <span className="font-bold">Productos con título &gt; 20 caracteres:</span> {titulosLargos}
        </li>
        <li>
          <span className="font-bold">Precio total de todos los productos:</span> ${precioTotal}
        </li>
        <li>
          <span className="font-bold">Promedio de descuento (%):</span> {promedioDescuento}%
        </li>
      </ul>
    </div>
  );
}

export default StatsPanel;