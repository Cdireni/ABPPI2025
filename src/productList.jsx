// Componente funcional para mostrar la lista de productos
function ProductList({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 transition-opacity duration-500 animate-fade-in">
      {products.map(product => (
        <div key={product.id} className="border p-4 m-2 rounded shadow bg-white flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2 text-center">{product.title}</h3>
          <p className="text-lg text-green-700 font-bold">Precio: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;