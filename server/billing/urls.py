from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import  staticfiles_urlpatterns
from .views import generate_invoice

urlpatterns = [
    path('invoice/', generate_invoice, name='generate_invoice'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns  += staticfiles_urlpatterns()
