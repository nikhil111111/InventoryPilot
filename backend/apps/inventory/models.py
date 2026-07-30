from django.db import models
from apps.products.models import Product
from apps.warehouses.models import Warehouse


class Inventory(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="inventory_items",
    )

    warehouse = models.ForeignKey(
        Warehouse,
        on_delete=models.CASCADE,
        related_name="inventory_items",
    )

    quantity = models.PositiveIntegerField(default=0)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("product", "warehouse")
        ordering = ["warehouse", "product"]

    def __str__(self):
        return f"{self.product.name} - {self.warehouse.name}: {self.quantity}"