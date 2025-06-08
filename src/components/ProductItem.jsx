function ProductItem({ product }) {
  return (
    <div className="border rounded p-4 shadow bg-white dark:bg-gray-800">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{product.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">${product.price}</p>
    </div>
  );
}
export default ProductItem;
