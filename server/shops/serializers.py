from rest_framework import serializers
from .models import Shops
from user.models import User
from days.serializers import DaySerializer
from days.models import Day

class Shops_serializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)  # Accept email in input
    days = DaySerializer(many=True, read_only=False)  # Allow writing to the days field

    class Meta:
        model = Shops
        fields = [
            'name',
            'description',
            'shirt_price',
            'pants_price',
            'safari_price',
            'total',
            'remaining_balance',
            'email',
            'days',
        ]
        extra_kwargs = {'user': {'write_only': True}}

    def create(self, validated_data):
        user_email = validated_data.pop('email')
        try:
            user = User.objects.get(email=user_email)  # Fetch user by email
        except User.DoesNotExist:
            raise serializers.ValidationError(f"No user found with email {user_email}")

        validated_data['user'] = user
        days_data = validated_data.pop('days', [])  # Extract days data

        # Create the shop instance
        shop = Shops.objects.create(**validated_data)

        # Create each day record
        for day_data in days_data:
            day_data['shop'] = shop  # Associate the day with the shop
            DaySerializer.create(DaySerializer(), validated_data=day_data)

        return shop

    def update(self, instance, validated_data):
        user_email = validated_data.pop('email', None)
        if user_email:
            try:
                user = User.objects.get(email=user_email)
                instance.user = user
            except User.DoesNotExist:
                raise serializers.ValidationError(f"No user found with email {user_email}")

        days_data = validated_data.pop('days', None)  # Extract days data
        if days_data:
            for day_data in days_data:
                day_id = day_data.get('id', None)
                if day_id:  # Update existing day
                    day_instance = Day.objects.get(id=day_id, shop=instance)
                    DaySerializer.update(DaySerializer(), day_instance, day_data)
                else:  # Create new day
                    day_data['shop'] = instance
                    DaySerializer.create(DaySerializer(), validated_data=day_data)

        return super().update(instance, validated_data)
