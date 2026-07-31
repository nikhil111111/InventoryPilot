from rest_framework import serializers
from .models import Inventory


class InventorySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    warehouse_name = serializers.CharField(
        source="warehouse.name",
        read_only=True
    )

    class Meta:
        model = Inventory
        fields = [
            "id",
            "product",
            "product_name",
            "warehouse",
            "warehouse_name",
            "quantity",
            "updated_at",
        ]

    def validate_quantity(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Quantity cannot be negative."
            )
        return value