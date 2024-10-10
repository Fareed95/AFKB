from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Shops
from .serializers import Shops_serializer
from rest_framework import status
from decimal import Decimal
from user.models import User

class ShopsViewSet(APIView):
    def get(self, request, pk=None):
        if pk:
            shop_instance = get_object_or_404(Shops, pk=pk)
            serializer = Shops_serializer(shop_instance)
        else:
            queryset = Shops.objects.all()
            serializer = Shops_serializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = Shops_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        shop_instance = get_object_or_404(Shops, pk=pk)
        serializer = Shops_serializer(shop_instance, data=request.data, partial=True)

        if serializer.is_valid():
            validated_data = serializer.validated_data
            user_email = validated_data.get('email', None)
            amount_paid = Decimal(validated_data.get('amount_paid', 0))

            # Handle the user update if email is provided
            if user_email:
                try:
                    user = User.objects.get(email=user_email)
                    shop_instance.user = user
                except User.DoesNotExist:
                    return Response({"error": f"No user found with email {user_email}"}, status=status.HTTP_400_BAD_REQUEST)

            # Calculate total sum from current `days`
            total_sum = sum(Decimal(day.each_day_total) for day in shop_instance.days.all())

            # Update remaining balance by subtracting the paid amount
            updated_balance = (shop_instance.remaining_balance or total_sum) - amount_paid
            shop_instance.remaining_balance = max(updated_balance, Decimal('0.00'))

            # Append the current `days` to `day_histories`
            shop_instance.day_histories.add(*shop_instance.days.all())

            # Clear the `days` after moving them to `day_histories`
            shop_instance.days.clear()

            # Save the instance with updated data
            shop_instance.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
