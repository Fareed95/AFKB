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

        # Convert updated quantities to integers
        shirts_updated = int(request.data.get('shirts_updated', 0))
        pants_updated = int(request.data.get('pants_updated', 0))
        safari_updated = int(request.data.get('safari_updated', 0))

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

            # Ensure price values are float
            try:
                shirt_price = float(shop_instance.shirt_price)
                pants_price = float(shop_instance.pants_price)
                safari_price = float(shop_instance.safari_price)
            except ValueError as ve:
                return Response({"error": f"Invalid price value: {ve}"}, status=status.HTTP_400_BAD_REQUEST)

            # Calculate total based on updated values
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
