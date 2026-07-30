from rest_framework import filters, viewsets

from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("name")
    serializer_class = ProductSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "sku"]