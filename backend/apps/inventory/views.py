from rest_framework import viewsets
from .models import Inventory
from .serializers import InventorySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .dashboard import get_reorder_dashboard


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.select_related(
        "product",
        "warehouse"
    )
    serializer_class = InventorySerializer

@api_view(["GET"])
def reorder_dashboard(request):
    data = get_reorder_dashboard()
    return Response(data)