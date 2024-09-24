from rest_framework import serializers
from .models import Shops
from user.models import User
from days.serializers import DaySerializer

class Shops_serializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)  # Accept email in input
    days = DaySerializer(many=True, read_only=True)  # Use DaySerializer for the days field

    class Meta:
        model = Shops
        fields = [
            'name',
            'description',
            'shirt_price',
            'pants_price',
            'safari_price',
            'email',
            'days' ,
            'total',
            'remaining_balance' # Include days as serialized data
        ]
        extra_kwargs = {'user': {'write_only': True}}

    def create(self, validated_data):
        user_email = validated_data.pop('email')
        try:
            user = User.objects.get(email=user_email)  # Fetch user by email
        except User.DoesNotExist:
            raise serializers.ValidationError(f"No user found with email {user_email}")

        validated_data['user'] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user_email = validated_data.pop('email', None)
        if user_email:
            try:
                user = User.objects.get(email=user_email)
                instance.user = user
            except User.DoesNotExist:
                raise serializers.ValidationError(f"No user found with email {user_email}")

        return super().update(instance, validated_data)
