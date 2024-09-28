from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Day, DayHistory  # Ensure you import the DayHistory model
from .serializers import DaySerializer
from shops.models import Shops
from django.utils import timezone

class DayViewSet(viewsets.ModelViewSet):
    queryset = Day.objects.all()
    serializer_class = DaySerializer

    def create(self, request, *args, **kwargs):
        shop_id = request.data.get('shop')

        # Retrieve updated quantities from request and handle empty cases
        shirts_updated = request.data.get('shirts_updated', 0)
        pants_updated = request.data.get('pants_updated', 0)
        safari_updated = request.data.get('safari_updated', 0)

        # Validate and convert to integers, defaulting to 0 if the value is invalid
        try:
            shirts_updated = int(shirts_updated) if shirts_updated else 0
            pants_updated = int(pants_updated) if pants_updated else 0
            safari_updated = int(safari_updated) if safari_updated else 0
        except ValueError:
            return Response({"error": "Invalid input for quantities."}, status=status.HTTP_400_BAD_REQUEST)

        date = timezone.now().date()

        try:
            shop_instance = Shops.objects.get(id=shop_id)

            # Retrieve or create the Day record
            day_record, created = Day.objects.get_or_create(
                shop=shop_instance,
                date=date,
                defaults={
                    'shirts_updated': shirts_updated,
                    'pants_updated': pants_updated,
                    'safari_updated': safari_updated,
                }
            )

            # If the record already exists, update it
            if not created:
                day_record.shirts_updated += shirts_updated
                day_record.pants_updated += pants_updated
                day_record.safari_updated += safari_updated

            # Calculate total based on updated values
            shirt_price = float(shop_instance.shirt_price or 0)
            pants_price = float(shop_instance.pants_price or 0)
            safari_price = float(shop_instance.safari_price or 0)

            day_record.each_day_total = (
                (day_record.shirts_updated * shirt_price) +
                (day_record.pants_updated * pants_price) +
                (day_record.safari_updated * safari_price)
            )

            day_record.save()  # Save the updated record

            # Create or update the history record
            day_history, _ = DayHistory.objects.update_or_create(
                shop=shop_instance,
                date=date,
                defaults={
                    'shirts_updated': day_record.shirts_updated,
                    'pants_updated': day_record.pants_updated,
                    'safari_updated': day_record.safari_updated,
                    'each_day_total': day_record.each_day_total,
                }
            )

            # Serialize the day record for the response
            serializer = self.get_serializer(day_record)
            return Response(serializer.data)

        except Shops.DoesNotExist:
            return Response({"error": "Shop not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
