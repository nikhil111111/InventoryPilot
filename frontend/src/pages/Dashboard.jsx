import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardCard from "../components/DashboardCard";
import SummaryCard from "../components/SummaryCard";
import Loading from "../components/Loading";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadDashboard = async (value = "") => {
    try {
      setLoading(true);

      const response = await api.get(`/dashboard/?search=${value}`);

      setProducts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const totalProducts = products.length;

  const totalWarehouses = new Set(
    products.flatMap((p) =>
      p.warehouses.map((w) => w.warehouse)
    )
  ).size;

  const totalInventory = products.reduce(
    (sum, p) => sum + p.total_stock,
    0
  );

  const urgentItems = products.filter(
    (p) => p.status === "Urgent"
  ).length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Reorder Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <SummaryCard
          title="Low Stock Products"
          value={totalProducts}
          color="#ef4444"
        />

        <SummaryCard
          title="Warehouses"
          value={totalWarehouses}
          color="#3b82f6"
        />

        <SummaryCard
          title="Total Stock"
          value={totalInventory}
          color="#22c55e"
        />

        <SummaryCard
          title="Urgent Items"
          value={urgentItems}
          color="#f97316"
        />
      </div>

      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            loadDashboard(e.target.value);
          }}
          className="border rounded-lg px-4 py-2 w-80"
        />
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center text-gray-500">
          🎉 Everything is sufficiently stocked.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {products.map((product) => (
            <DashboardCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;