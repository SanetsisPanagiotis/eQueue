# Generated by Django 2.1.4 on 2018-12-30 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djbr', '0009_review_grade'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='grade',
            field=models.IntegerField(verbose_name='grade'),
        ),
    ]