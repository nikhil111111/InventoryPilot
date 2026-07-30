from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Price cannot be negative."
            )
        return value

    def validate_reorder_threshold(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Reorder threshold must be greater than 0."
            )
        return value

    def validate_reorder_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Reorder quantity must be greater than 0."
            )
        return value