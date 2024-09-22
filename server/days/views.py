from rest_framework import viewsets
from .models import Day
from .serializers import DaySerializer

class DayViewSet(viewsets.ModelViewSet):
    queryset = Day.objects.all()
    serializer_class = DaySerializer
