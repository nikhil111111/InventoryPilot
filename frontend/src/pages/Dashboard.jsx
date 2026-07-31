import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const loadDashboard = async (value = "") => {
    try {
      const response = await api.get(
        `/dashboard/?search=${value}`
      );

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Reorder Dashboard
        </h1>

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            loadDashboard(e.target.value);
          }}
          className="border rounded-lg px-4 py-2 w-72"
        />

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        {products.map((product) => (
          <DashboardCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}

export default Dashboard;