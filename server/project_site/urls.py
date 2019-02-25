from django.conf.urls import url, include
from django.contrib import admin


from django.conf import settings
from django.conf.urls.static import static

from djbr import views
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token
from rest_auth.registration.views import RegisterView


urlpatterns = [
    url(r'^api/', include('djbr.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^api/users/', RegisterView.as_view()),
    url(r'^api/contact/?$', views.ContactDetail.as_view()),
]

urlpatterns += url(r'^(?P<path>.*)$', views.index),
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
