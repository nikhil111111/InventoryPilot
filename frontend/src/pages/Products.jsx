import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../api/api";
import ProductForm from "../components/ProductForm";
import Loading from "../components/Loading";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async (searchValue = "") => {
    try {
      setLoading(true);

      const response = await api.get(
        `/products/?search=${searchValue}`
      );

      setProducts(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}/`);

      toast.success("Product deleted");

      loadProducts(search);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button
          onClick={() => {
            setSelectedProduct(null);
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      <div className="flex justify-end mb-5">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            loadProducts(e.target.value);
          }}
          className="border rounded-lg px-4 py-2 w-72"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">SKU</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Threshold</th>
              <th className="text-left p-4">Reorder Qty</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-4">{product.sku}</td>

                  <td className="p-4">{product.name}</td>

                  <td className="p-4">
                    ₹ {product.price}
                  </td>

                  <td className="p-4">
                    {product.reorder_threshold}
                  </td>

                  <td className="p-4">
                    {product.reorder_quantity}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-5">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpen(true);
                        }}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ProductForm
        open={open}
        onClose={() => setOpen(false)}
        loadProducts={() => loadProducts(search)}
        selectedProduct={selectedProduct}
      />
    </div>
  );
}

export default Products;