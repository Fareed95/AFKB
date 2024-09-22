from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Shops
from .serializers import Shops_serializer
from rest_framework import status


class  ShopsViewSet(ModelViewSet):
    queryset = Shops.objects.all()
    serializer_class = Shops_serializer
