# Generated by Django 2.1.4 on 2018-12-29 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djbr', '0005_auto_20181225_0948'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='about',
            field=models.CharField(default='nada', max_length=500),
        ),
        migrations.AddField(
            model_name='book',
            name='address',
            field=models.CharField(default='athens', max_length=200),
        ),
        migrations.AddField(
            model_name='book',
            name='availability',
            field=models.IntegerField(default=10, verbose_name='availability'),
        ),
    ]
