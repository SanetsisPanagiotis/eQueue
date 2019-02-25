from django.conf.urls import url
from . import views

app_name = 'djbr'

urlpatterns = [
    url(r'^restaurants/?$', views.BookList.as_view()),
    url(r'^restaurants/(?P<pk>[0-9]+)/?$', views.BookDetail.as_view()),
    url(r'^restaurants/(?P<book_id>[0-9]+)/reviews/?$', views.ReviewList.as_view()),
]
