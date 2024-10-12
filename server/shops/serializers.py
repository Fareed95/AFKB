from rest_framework import serializers
from .models import Shops
from user.models import User
from days.models import Day
from days.serializers import DaySerializer
from decimal import Decimal

class Shops_serializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    days = DaySerializer(many=True, read_only=True)
    day_histories = DaySerializer(many=True, read_only=True)
    total = serializers.FloatField(read_only=True)
    amount_to_bill = serializers.FloatField(read_only=True)
    amount_paid = serializers.FloatField(write_only=True, required=False)
    remaining_balance = serializers.FloatField(read_only=True)

    class Meta:
        model = Shops
        fields = [
            'id',
            'name',
            'description',
            'shirt_price',
            'pants_price',
            'safari_price',
            'email',
            'days',
            'day_histories',
            'total',
            'remaining_balance',
            'amount_to_bill',
            'amount_paid'
        ]
        extra_kwargs = {'user': {'write_only': True}}

    def create(self, validated_data):
        user_email = validated_data.pop('email')
        try:
            user = User.objects.get(email=user_email)
        except User.DoesNotExist:
            raise serializers.ValidationError(f"No user found with email {user_email}")

        validated_data['user'] = user
        return super().create(validated_data)

    # def update(self, instance, validated_data):
    #     user_email = validated_data.pop('email', None)
    #     amount_paid = Decimal(validated_data.pop('amount_paid', 0))

    #     # Update user if the email is provided
    #     if user_email:
    #         try:
    #             user = User.objects.get(email=user_email)
    #             instance.user = user
    #         except User.DoesNotExist:
    #             raise serializers.ValidationError(f"No user found with email {user_email}")

    #     # Calculate total sum from current `days`
    #     total_sum = sum(Decimal(day.each_day_total) for day in instance.days.all())

    #     # Update remaining balance by subtracting the paid amount
    #     updated_balance = (instance.remaining_balance or total_sum) - amount_paid
    #     instance.remaining_balance = max(updated_balance, Decimal('0.00'))

    #     # Preserve existing day histories and append new day data
    #     new_day_history = list(instance.days.all())  # Current days to be added to history
    #     instance.day_histories.add(*new_day_history)  # Append to day histories

    #     # Clear `days` after adding to `day_histories`
    #     instance.days.clear()

    #     # Save the instance with the updated balance and histories
    #     instance.save()

    #     return super().update(instance, validated_data)

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     total_sum = sum(day['each_day_total'] for day in representation['days'])
    #     remaining_balance = float(representation.get('remaining_balance', 0.0))

    #     # Adjust the total and amount to bill calculations
    #     representation['total'] = total_sum
    #     representation['amount_to_bill'] = total_sum + remaining_balance
    #     return representation
