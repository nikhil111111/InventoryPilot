from rest_framework.routers import DefaultRouter
from .views import WarehouseViewSet

router = DefaultRouter()
router.register(r"warehouses", WarehouseViewSet, basename="warehouses")

urlpatterns = router.urls