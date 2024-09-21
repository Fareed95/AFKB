from django.urls import path, include
from . views import LoginView, LogoutView
from . user_view import UserView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import  staticfiles_urlpatterns


urlpatterns = [
    path('login',LoginView.as_view()),
    path('user',UserView.as_view()),
    path('logout',LogoutView.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns  += staticfiles_urlpatterns()  
