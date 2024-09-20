from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import  staticfiles_urlpatterns
from . views import index


urlpatterns = [
    path('index',index, name ='index')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns  += staticfiles_urlpatterns()  
