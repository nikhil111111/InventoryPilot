from django.db.models import Sum, Prefetch

from apps.products.models import Product
from apps.inventory.models import Inventory


def get_reorder_dashboard():
    products = (
        Product.objects
        .prefetch_related(
            Prefetch(
                "inventory_items",
                queryset=Inventory.objects.select_related("warehouse")
            )
        )
        .annotate(
            total_stock=Sum("inventory_items__quantity")
        )
        .order_by("name")
    )

    dashboard = []

    for product in products:
        stock = product.total_stock or 0
        threshold = product.reorder_threshold

        if stock <= threshold:
            dashboard.append({
                "id": product.id,
                "sku": product.sku,
                "name": product.name,
                "total_stock": stock,
                "reorder_threshold": threshold,
                "reorder_quantity": product.reorder_quantity,
                "urgency": threshold - stock,
                "status": "Urgent" if stock == 0 else "Low Stock",
                "warehouses": [
                    {
                        "warehouse": item.warehouse.name,
                        "stock": item.quantity
                    }
                    for item in product.inventory_items.all()
                ]
            })

    dashboard.sort(key=lambda x: x["urgency"], reverse=True)

    return dashboard