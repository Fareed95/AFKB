from rest_framework import serializers
from .models import Shops
from user.models import User
from days.serializers import DaySerializer

class Shops_serializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)  # Accept email in input
    days = DaySerializer(many=True, read_only=True)  # Use DaySerializer for the days field
    total = serializers.FloatField(read_only=True)  # Total field, read-only as we calculate it
    amount_to_bill = serializers.FloatField(read_only=True)  # Read-only field for calculated amount

    class Meta:
        model = Shops
        fields = [
            'name',
            'description',
            'shirt_price',
            'pants_price',
            'safari_price',
            'email',
            'days',
            'total',
            'remaining_balance',
            'amount_to_bill'  # New field for total + remaining_balance
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

    def to_representation(self, instance):
        # First, get the original serialized data
        representation = super().to_representation(instance)

        # Calculate the total of all `each_day_total` from days
        total_sum = sum(day['each_day_total'] for day in representation['days'])

        # Get the remaining_balance, ensuring it's a float for calculations
        remaining_balance = float(representation.get('remaining_balance', 0.0))

        # Update the total and amount_to_bill dynamically
        representation['total'] = total_sum
        representation['amount_to_bill'] = total_sum + remaining_balance  # Calculate amount_to_bill

        return representation
