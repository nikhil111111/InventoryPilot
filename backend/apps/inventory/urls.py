from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import InventoryViewSet, reorder_dashboard

router = DefaultRouter()
router.register(r"inventory", InventoryViewSet, basename="inventory")

urlpatterns = [
    path("dashboard/", reorder_dashboard, name="reorder-dashboard"),
]

urlpatterns += router.urls