from . import views

from django.conf.urls import url, include
from rest_framework import routers

app_name = 'djbr'

urlpatterns = [
    url(r'^restaurants/?$', views.BookList.as_view()),
    url(r'^restaurants/(?P<pk>[0-9]+)/?$', views.BookDetail.as_view()),
    url(r'^restaurants/(?P<book_id>[0-9]+)/reviews/?$', views.ReviewList.as_view()),
    url(r'^allusers/?$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/?$', views.UserList.as_view()),
    url(r'^contact/?$', views.ContactDetail.as_view()),
    #url(r'^reservations/?$', views.ReservationDetail.as_view()),
    url(r'^reservations/?$', views.ReservationList.as_view(), name='task_detail'),
    url(r'^reservations/(?P<pk>[0-9]+)/?$', views.ReservationDetail.as_view()),
]
