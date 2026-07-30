from rest_framework import serializers
from .models import ReorderRule


class ReorderRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReorderRule
        fields = "__all__"