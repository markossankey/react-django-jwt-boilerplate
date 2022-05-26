from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import TestModel
from .serializers import TestModelSerializer
# Create your views here.

class TestModelViewset(viewsets.ModelViewSet):
    queryset = TestModel.objects.all()
    serializer_class = TestModelSerializer
    permission_classes = [permissions.IsAuthenticated]
