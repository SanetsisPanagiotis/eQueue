from rest_framework import serializers
from .models import Book, Review, Contact, Reservation
from django.contrib.auth.models import User, Group

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'pub_year', 'grade', 'address', 'about', 'availability', 'url')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'title', 'text', 'grade', 'review_date', 'book')

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('id', 'book', 'user', 'date')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name','last_name','last_login','email', 'password')
        extra_kwargs = {'password': {'required':True}}

    def create(user):
        user = User.objects.create_user(user)
        return user

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('title', 'text')
