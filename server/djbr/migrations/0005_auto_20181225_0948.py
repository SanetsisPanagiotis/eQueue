# Generated by Django 2.2.dev20181116200922 on 2018-12-25 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djbr', '0004_auto_20181223_1147'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='grade',
            field=models.IntegerField(verbose_name='grade'),
        ),
    ]
