from rest_framework import viewsets
from .models import ReorderRule
from .serializers import ReorderRuleSerializer


class ReorderRuleViewSet(viewsets.ModelViewSet):
    queryset = ReorderRule.objects.select_related("product")
    serializer_class = ReorderRuleSerializer