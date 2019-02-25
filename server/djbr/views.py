from .models import Book, Review, Contact, Reservation
from .serializers import BookSerializer, ReviewSerializer, ContactSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.contrib.staticfiles import views
from rest_framework import permissions

from rest_framework.generics import CreateAPIView
from .serializers import UserSerializer, ReservationSerializer

def index(request, path=''):
    if (path.endswith('.js')):
        return views.serve(request, path)
    else:
        return views.serve(request, 'index.html')

class BookList(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title__icontains=title)
        return queryset

class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        User = get_user_model()
        queryset = User.objects.all()
        id = self.request.query_params.get('id', None)
        username = self.request.query_params.get('username', None)
        firstname = self.request.query_params.get('firstname', None)
        lastname = self.request.query_params.get('lastname', None)
        return queryset


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class ReviewList(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = Review.objects.all()
        book_id = self.kwargs.get('book_id', None)
        if book_id is not None:
            queryset = queryset.filter(book=book_id)
        return queryset

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class ReservationList(generics.ListCreateAPIView):
    serializer_class = ReservationSerializer

    def get_queryset(self):
        queryset = Reservation.objects.all()
        title = self.request.query_params.get('id', None)
        if title is not None:
            queryset = queryset.filter(title__icontains=title)
        return queryset

class ReservationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            user = self.model.get(username=serializer.data['username'])
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return Response(
                token,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        else:
            return Response(
                status=status.HTTP_400_BAD_REQUEST
)
class ContactDetail(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = (permissions.AllowAny,)
