import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";

const initialState = {
    product: "",
    warehouse: "",
    quantity: "",
};

function InventoryForm({
    open,
    onClose,
    loadInventory,
    selectedInventory,
}) {
    const [formData, setFormData] = useState(initialState);

    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        if (!open) return;

        loadDropdowns();

        if (selectedInventory) {
            setFormData({
                product: selectedInventory.product,
                warehouse: selectedInventory.warehouse,
                quantity: selectedInventory.quantity,
            });
        } else {
            setFormData(initialState);
        }
    }, [open, selectedInventory]);

    const loadDropdowns = async () => {
        try {
            const [productsRes, warehousesRes] = await Promise.all([
                api.get("/products/"),
                api.get("/warehouses/"),
            ]);

            setProducts(productsRes.data);
            setWarehouses(warehousesRes.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load dropdown data");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                product: Number(formData.product),
                warehouse: Number(formData.warehouse),
                quantity: Number(formData.quantity),
            };

            if (selectedInventory) {
                await api.put(
                    `/inventory/${selectedInventory.id}/`,
                    payload
                );

                toast.success("Inventory updated");
            } else {
                await api.post(
                    "/inventory/",
                    payload
                );

                toast.success("Inventory created");
            }

            loadInventory();
            onClose();
        } catch (err) {
            console.error(err);

            const errors = err.response?.data;

            if (errors?.non_field_errors) {
                toast.error("Inventory already exists for this product and warehouse.");
            } else if (errors) {
                const message = Object.values(errors)
                    .flat()
                    .join("\n");

                toast.error(message);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-lg p-6 w-[500px]">

                <h2 className="text-2xl font-bold mb-5">
                    {selectedInventory
                        ? "Edit Inventory"
                        : "Add Inventory"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <select
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        className="w-full border rounded p-3"
                        required
                    >
                        <option value="">
                            Select Product
                        </option>

                        {products.map((product) => (
                            <option
                                key={product.id}
                                value={product.id}
                            >
                                {product.name}
                            </option>
                        ))}
                    </select>

                    <select
                        name="warehouse"
                        value={formData.warehouse}
                        onChange={handleChange}
                        className="w-full border rounded p-3"
                        required
                    >
                        <option value="">
                            Select Warehouse
                        </option>

                        {warehouses.map((warehouse) => (
                            <option
                                key={warehouse.id}
                                value={warehouse.id}
                            >
                                {warehouse.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full border rounded p-3"
                        required
                    />

                    <div className="flex justify-end gap-3 pt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default InventoryForm;