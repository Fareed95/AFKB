from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DayViewSet

router = DefaultRouter()
router.register(r'days', DayViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
