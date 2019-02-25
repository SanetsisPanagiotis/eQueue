from django.contrib import admin

from .models import Book, Review, Author, Contact, Reservation

admin.site.register(Book)
admin.site.register(Review)
admin.site.register(Author)
admin.site.register(Contact)
admin.site.register(Reservation)
