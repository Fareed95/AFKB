from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from .views import generate_invoice

urlpatterns = [
    # Path to generate an invoice for a specific shop using shop_id
    path('invoice/<int:shop_id>/', generate_invoice, name='generate_invoice'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve static files during development
urlpatterns += staticfiles_urlpatterns()
