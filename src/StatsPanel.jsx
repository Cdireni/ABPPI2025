
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie,
  Cell, Legend} from 'recharts';
import React from 'react';

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

 // Calcular cantidad de productos por categoría
const productosPorCategoria = {};
products.forEach(p => {
  productosPorCategoria[p.category] = (productosPorCategoria[p.category] || 0) + 1;
});

// Convertimos a array para Recharts
const dataBarras = Object.entries(productosPorCategoria).map(([categoria, cantidad]) => ({
  categoria,
  cantidad
}));

// Datos para línea de evolución de precios (simulados)
const priceEvolution = products.slice(0, 10).map((p, i) => ({
  name: `P${i + 1}`,
  price: p.price + Math.floor(Math.random() * 20) - 10, // simulación con variación aleatoria
}));

// Datos para pie chart de stock
const stockRanges = {
  bajo: products.filter(p => p.stock <= 20).length,
  medio: products.filter(p => p.stock > 20 && p.stock <= 50).length,
  alto: products.filter(p => p.stock > 50).length,
};

const pieData = [
  { name: 'Stock bajo (≤20)', value: stockRanges.bajo },
  { name: 'Stock medio (21–50)', value: stockRanges.medio },
  { name: 'Stock alto (>50)', value: stockRanges.alto },
];

const COLORS = ['#FF8042', '#FFBB28', '#00C49F'];


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

            <h4 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Productos por categoría</h4>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={dataBarras}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>


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

      {/* Gráfico de líneas: evolución de precios */}
      <h4 className="text-xl font-semibold mt-8 text-gray-800">Evolución de Precios (simulada)</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={priceEvolution}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Pie chart: proporción de productos según stock */}
      <h4 className="text-xl font-semibold mt-8 text-gray-800">Distribución de Stock</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default StatsPanel;
