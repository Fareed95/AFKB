from django.urls import path,include
from . import views
from rest_framework.routers import  DefaultRouter

router  = DefaultRouter()
router.register(r'shops',views.ShopsViewSet,basename='users')

urlpatterns = [
    path('',include(router.urls)),
]

