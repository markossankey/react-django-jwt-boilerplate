from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import TestModel
from .serializers import TestModelSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class TestModelViewset(viewsets.ModelViewSet):
    queryset = TestModel.objects.all()
    serializer_class = TestModelSerializer
    permission_classes = [permissions.IsAuthenticated]

class TokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh_token = response.data['refresh']
        response.set_cookie('refresh_token', refresh_token, httponly=True)
        return response