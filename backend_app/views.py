from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import TestModel
from .serializers import TestModelSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http.response import JsonResponse


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

class TokenRefreshView(TokenRefreshView):
    
    # Checks to see if refresh_token cookie is present and refreshes access token, if not, returns 401 error
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES['refresh_token']
            request.data['refresh'] = refresh_token
            if (refresh_token):
                return super().post(request, *args, **kwargs)
        except:
            return JsonResponse(data={'message': 'refresh token not present or expired'}, status=401)

    # Removes http only cookie "refresh_token"
    def delete(self, request, *args, **kwargs):
        response = JsonResponse(data={'message': 'successfully logged out'})
        response.delete_cookie('refresh_token')
        return response