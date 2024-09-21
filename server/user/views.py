from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
import jwt
# from jwt import encode
import datetime
from django.utils import timezone
from .models import User
from .serializers import UserSerializer
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.core.cache import cache
import ssl
import requests

# Disable SSL verification
ssl._create_default_https_context = ssl._create_unverified_context

class LoginView(APIView):
    @csrf_exempt
    def post(self, request):
        email = request.data['email']

        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User Not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password')

        if not user.is_active:
            raise AuthenticationFailed('Account not activated. Please verify your email.')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.data = {
            'jwt': token  # No "Bearer" prefix
        }

        return response


class LogoutView(APIView):
    @csrf_exempt
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': "Logged out successfully"
        }
        return response

