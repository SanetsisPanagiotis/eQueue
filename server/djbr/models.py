from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

import bcrypt

class Book(models.Model):
    title = models.CharField(max_length=200)
    pub_year = models.IntegerField('date published', default=2000)
    grade = models.IntegerField('grade')
    address = models.CharField(max_length=200, default='athens')
    about = models.CharField(max_length=500, default='nada')
    availability = models.IntegerField('availability', default=10)
    url = models.CharField(max_length=1000,default='https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjK4bXtj8_gAhWuxYUKHUM4D4kQjRx6BAgBEAU&url=https%3A%2F%2Fangular.io%2Fpresskit&psig=AOvVaw0sPfIJe--bwUJrL_EcA9hH&ust=1550917445778491')

    def was_published_recently(self):
        return (self.pub_year >= timezone.now().year - 1)

    def __str__(self):
        return "%s %s %s %s %s %s %s" % (self.title, self.pub_year, self.grade, self.address, self.about, self.availability, self.url)

class Review(models.Model):
    title = models.CharField(max_length=200)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    text = models.TextField(default="")
    grade = models.IntegerField('grade')
    review_date = models.DateTimeField('review date',
                                       default=timezone.now)

    def __str__(self):
        return "%s %s %s %s" % (self.title, self.text, self.grade, self.review_date)

class Reservation(models.Model):
    id = models.IntegerField('Id', primary_key=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField('date',default=timezone.now)

    def __str__(self):
        return "%s %s %s %s" % (self.id, self.book, self.user, self.date)


class Author(models.Model):
    name = models.CharField(max_length=200)
    books = models.ManyToManyField(Book)

    def __str__(self):
        return self.name

class Contact(models.Model):
    title = models.CharField(max_length=200)
    text = models.CharField(max_length=2000)

    def __str__(self):
        return "%s %s " % (self.title, self.text)

class ExampleModel(models.Model):
    model_pic = models.ImageField(upload_to = 'pic_folder/', default = 'pic_folder/None/no-img.jpg')


class ExampleImage(models.Model):
    avatar = models.ImageField("Avatar", blank=False, null=True)
