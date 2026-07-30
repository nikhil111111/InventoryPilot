from django.db import models
from apps.products.models import Product


class ReorderRule(models.Model):
    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        related_name="reorder_rule",
    )

    threshold = models.PositiveIntegerField()
    reorder_quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f"{self.product.name} | "
            f"Threshold: {self.threshold} | "
            f"Reorder Qty: {self.reorder_quantity}"
        )