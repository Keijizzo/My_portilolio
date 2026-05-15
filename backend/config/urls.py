from django.contrib import admin
from django.urls import include, path

from api.views import api_root

urlpatterns = [
    path("", api_root),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]
