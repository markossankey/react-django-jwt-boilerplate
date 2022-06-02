from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TestModelViewset, TokenObtainPairView, TokenRefreshView

rest_router = DefaultRouter()

rest_router.register(r'tests', TestModelViewset)

token_paths = [
    
    path('token/', TokenObtainPairView.as_view(), name="obtain_token_pair"), # Custom class to set token in HTTPOnly cookie
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns = [
    path('', include(rest_router.urls)),
    *token_paths,

]
