from rest_framework import serializers
from django.utils import timezone
from .models import Day
from shops.models import Shops

class DaySerializer(serializers.ModelSerializer):
    date = serializers.DateField(read_only=True)  # Make date read-only
    shop = serializers.PrimaryKeyRelatedField(queryset=Shops.objects.all())  # Include the shop field

    class Meta:
        model = Day
        fields = ['shop', 'date', 'shirts_updated', 'pants_updated', 'safari_updated', 'each_day_total']

    def calculate_each_day_total(self, shirts_updated, pants_updated, safari_updated, shop):
        """Calculate total based on the prices and updated counts."""
        return (
            (shirts_updated * float(shop.shirt_price)) +
            (pants_updated * float(shop.pants_price)) +
            (safari_updated * float(shop.safari_price))
        )

    def create(self, validated_data):
        validated_data['date'] = timezone.now().date()  # Automatically assign today's date
        shop = validated_data['shop']

        # Check if a record already exists for this shop and date
        try:
            day_record = Day.objects.get(shop=shop, date=validated_data['date'])
            # If it exists, update the existing record
            day_record.shirts_updated += validated_data.get('shirts_updated', 0)
            day_record.pants_updated += validated_data.get('pants_updated', 0)
            day_record.safari_updated += validated_data.get('safari_updated', 0)

            # Calculate and update the each_day_total
            day_record.each_day_total = self.calculate_each_day_total(
                day_record.shirts_updated,
                day_record.pants_updated,
                day_record.safari_updated,
                shop
            )
            day_record.save()
            return day_record
        except Day.DoesNotExist:
            # Create a new record if it doesn't exist
            each_day_total = self.calculate_each_day_total(
                validated_data.get('shirts_updated', 0),
                validated_data.get('pants_updated', 0),
                validated_data.get('safari_updated', 0),
                shop
            )
            validated_data['each_day_total'] = each_day_total
            return super().create(validated_data)

    def update(self, instance, validated_data):
        shop = instance.shop

        # Update fields
        instance.shirts_updated += validated_data.get('shirts_updated', 0)
        instance.pants_updated += validated_data.get('pants_updated', 0)
        instance.safari_updated += validated_data.get('safari_updated', 0)

        # Calculate and update the each_day_total
        instance.each_day_total = self.calculate_each_day_total(
            instance.shirts_updated,
            instance.pants_updated,
            instance.safari_updated,
            shop
        )

        instance.save()
        return instance
