from rest_framework import serializers
from .models import Shops
from user.models import User

class Shops_serializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)  # Accept email in input

    class Meta:
        model = Shops
        # Specify all the fields you want to include in the serialized output
        fields = ['name', 'description', 'shirt_price', 'pants_price', 'safari_price', 'email']
        # Exclude 'user' field from the output as requested
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
