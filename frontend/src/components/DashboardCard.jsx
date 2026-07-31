function DashboardCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow p-5 border-l-4 border-red-500">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {product.name}
        </h2>

        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
          {product.status}
        </span>
      </div>

      <p className="text-gray-500 mt-1">
        SKU : {product.sku}
      </p>

      <div className="grid grid-cols-3 gap-4 mt-5">

        <div>
          <p className="text-gray-500 text-sm">
            Stock
          </p>

          <h3 className="text-2xl font-bold">
            {product.total_stock}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Threshold
          </p>

          <h3 className="text-2xl font-bold">
            {product.reorder_threshold}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Reorder
          </p>

          <h3 className="text-2xl font-bold">
            {product.reorder_quantity}
          </h3>
        </div>

      </div>

      <div className="mt-5">
        <h4 className="font-semibold mb-2">
          Warehouse Stock
        </h4>

        {product.warehouses.map((warehouse, index) => (
          <div
            key={index}
            className="flex justify-between border-b py-1"
          >
            <span>{warehouse.warehouse}</span>

            <span>{warehouse.stock}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default DashboardCard;