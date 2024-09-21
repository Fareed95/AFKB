from rest_framework import serializers
from django.utils import timezone
from .models import Day
from shops.models import Shops

class DaySerializer(serializers.ModelSerializer):
    date = serializers.DateField(read_only=True)  # Make date read-only
    shop = serializers.PrimaryKeyRelatedField(queryset=Shops.objects.all())  # Include the shop field

    class Meta:
        model = Day
        fields = ['shop', 'date', 'shirts_updated', 'pants_updated', 'safari_updated']

    def create(self, validated_data):
        validated_data['date'] = timezone.now().date()  # Automatically assign today's date
        shop = validated_data['shop']
        date = validated_data['date']

        # Check if a record already exists for this shop and date
        try:
            day_record = Day.objects.get(shop=shop, date=date)
            # If it exists, update the existing record
            day_record.shirts_updated += validated_data.get('shirts_updated', 0)
            day_record.pants_updated += validated_data.get('pants_updated', 0)
            day_record.safari_updated += validated_data.get('safari_updated', 0)
            day_record.save()
            return day_record
        except Day.DoesNotExist:
            # Create a new record if it doesn't exist
            return super().create(validated_data)
