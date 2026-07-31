import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../api/api";
import InventoryForm from "../components/InventoryForm";
import Loading from "../components/Loading";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const loadInventory = async () => {
    try {
      setLoading(true);

      const response = await api.get("/inventory/");
      setInventory(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const deleteInventory = async (id) => {
    if (!window.confirm("Delete this inventory record?")) return;

    try {
      await api.delete(`/inventory/${id}/`);

      toast.success("Inventory deleted");
      loadInventory();
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
        <h1 className="text-3xl font-bold">Inventory</h1>

        <button
          onClick={() => {
            setSelectedInventory(null);
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add Inventory
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Warehouse</th>
              <th className="text-left p-4">Quantity</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-4">{item.product_name}</td>

                  <td className="p-4">{item.warehouse_name}</td>

                  <td className="p-4">{item.quantity}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-5">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setSelectedInventory(item);
                          setOpen(true);
                        }}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => deleteInventory(item.id)}
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
                  colSpan="4"
                  className="text-center py-12 text-gray-500"
                >
                  No inventory records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <InventoryForm
        open={open}
        onClose={() => setOpen(false)}
        loadInventory={loadInventory}
        selectedInventory={selectedInventory}
      />
    </div>
  );
}

export default Inventory;