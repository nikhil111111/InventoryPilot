import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";

const initialState = {
    sku: "",
    name: "",
    description: "",
    price: "",
    reorder_threshold: "",
    reorder_quantity: "",
};

function ProductForm({
    open,
    onClose,
    loadProducts,
    selectedProduct,
}) {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (selectedProduct) {
            setFormData(selectedProduct);
        } else {
            setFormData(initialState);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (selectedProduct) {
                await api.put(
                    `/products/${selectedProduct.id}/`,
                    formData
                );

                toast.success("Product updated");
            } else {
                await api.post(
                    "/products/",
                    formData
                );

                toast.success("Product created");
            }

            loadProducts();
            onClose();
        } catch (err) {
            console.error(err);

            if (err.response?.data) {
                const errors = err.response.data;

                const firstError = Object.values(errors)
                    .flat()
                    .join("\n");

                toast.error(firstError);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-lg p-6 w-[600px]">

                <h2 className="text-2xl font-bold mb-5">

                    {selectedProduct
                        ? "Edit Product"
                        : "Add Product"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >

                    <input
                        className="border p-2 rounded"
                        name="sku"
                        placeholder="SKU"
                        value={formData.sku}
                        onChange={handleChange}
                    />

                    <input
                        className="border p-2 rounded"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        className="border p-2 rounded"
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <input
                        className="border p-2 rounded"
                        name="reorder_threshold"
                        type="number"
                        placeholder="Threshold"
                        value={formData.reorder_threshold}
                        onChange={handleChange}
                    />

                    <input
                        className="border p-2 rounded"
                        name="reorder_quantity"
                        type="number"
                        placeholder="Reorder Qty"
                        value={formData.reorder_quantity}
                        onChange={handleChange}
                    />

                    <textarea
                        className="border p-2 rounded col-span-2"
                        name="description"
                        rows={3}
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <div className="col-span-2 flex justify-end gap-3 mt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default ProductForm;