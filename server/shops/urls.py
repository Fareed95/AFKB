from django.urls import path
from . import views

urlpatterns = [
    path('shops/', views.ShopsViewSet.as_view()),  # For listing and creating
    path('shops/<int:pk>/', views.ShopsViewSet.as_view()),  # For retrieving, updating, or deleting a specific shop
]
