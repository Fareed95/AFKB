from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Shops
from .serializers import Shops_serializer
from rest_framework import status
from decimal import Decimal
from user.models import User
from days.models import DayHistory
from days.models import Day
from django.db.models import Sum


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

    # def patch(self, request, pk=None):
    #     shop_instance = get_object_or_404(Shops, pk=pk)
    #     serializer = Shops_serializer(shop_instance, data=request.data, partial=True)

    #     if serializer.is_valid():
    #         validated_data = serializer.validated_data

    #         user_email = validated_data.get('email')
    #         amount_paid = Decimal(validated_data.get('amount_paid', 0))

    #         # Handle the user update if email is provided
    #         if user_email:
    #             try:
    #                 user = User.objects.get(email=user_email)
    #                 shop_instance.user = user
    #             except User.DoesNotExist:
    #                 return Response({"error": f"No user found with email {user_email}"}, status=status.HTTP_400_BAD_REQUEST)

    #         # Calculate total sum from current `days`
    #         total_sum = sum(Decimal(day.each_day_total) for day in shop_instance.days.all())

    #         # Update remaining balance by subtracting the paid amount
    #         shop_instance.remaining_balance = max((shop_instance.remaining_balance or total_sum) - amount_paid, Decimal('0.00'))

    #         # Move current `days` into `day_histories` by creating new instances
    #         for day in shop_instance.days.all():
    #             day_history = DayHistory(
    #                 shop=shop_instance,  # Assuming you need to relate back to the shop
    #                 date=day.date,       # Assuming `date` is a field in `Day`
    #                 each_day_total=day.each_day_total,  # Map the total as needed
    #                 # Add other fields as required
    #             )
    #             day_history.save()  # Save the new DayHistory instance

    #         # Clear `days` after archiving
    #         shop_instance.days.all().delete()  # Use delete instead of clear to remove the records

    #         # Save the instance with updated data
    #         shop_instance.save()

    #         return Response(serializer.data, status=status.HTTP_200_OK)

    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    def patch(self, request, pk=None):
        shop_instance = get_object_or_404(Shops, pk=pk)
        serializer = Shops_serializer(shop_instance, data=request.data, partial=True)

        if serializer.is_valid():
            validated_data = serializer.validated_data
            user_email = validated_data.get('email')

            # Fetch amount_paid from request.data
            amount_paid = request.data.get('amount_paid')
            print("Amount Paid: ", amount_paid)

            # Sum up the each_day_total for the filtered Day instances belonging to the shop
            total_each_day_sum = Day.objects.filter(shop=shop_instance).aggregate(Sum('each_day_total'))['each_day_total__sum'] or 0.0

            # Print the total of each_day_total
            print(f"Total Each Day Sum for Shop ID {pk}: {total_each_day_sum}")

            # making the logic for remaining balance
            #fetching the remaining balance first
            remaining_balance = shop_instance.remaining_balance
            print(f'Remaining Balance for Shop ID {pk}: {remaining_balance}')

            remaining_balance_updated = Decimal(total_each_day_sum) - Decimal(amount_paid) + Decimal(remaining_balance)
            # checking fot updatiopn of new value
            shop_instance.remaining_balance = Decimal(remaining_balance_updated)

            deleted_count, _ = Day.objects.filter(shop=shop_instance).delete()
            print(f'Successfully deleted {deleted_count} records from the Day model for Shop ID {pk}.')


            serializer.save()
            return Response({
                'shop': serializer.data,
                'total_each_day_sum': total_each_day_sum ,
                'deleted_records': deleted_count # Include total sum in response if needed
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)