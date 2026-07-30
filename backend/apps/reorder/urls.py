from rest_framework.routers import DefaultRouter
from .views import ReorderRuleViewSet

router = DefaultRouter()
router.register(r"reorder-rules", ReorderRuleViewSet, basename="reorder-rules")

urlpatterns = router.urls