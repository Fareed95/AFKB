from django.urls import path,include
from . import views
from rest_framework.routers import  DefaultRouter

router  = DefaultRouter() 
router.register(r'users',views.ShopsViewSet,basename='users')

urlpatterns = [
    path('shops',include(router.urls)),
]

