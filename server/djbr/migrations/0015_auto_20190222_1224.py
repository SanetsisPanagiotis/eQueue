# Generated by Django 2.1.4 on 2019-02-22 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djbr', '0014_auto_20190222_1220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='url',
            field=models.CharField(blank=True, default='https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjK4bXtj8_gAhWuxYUKHUM4D4kQjRx6BAgBEAU&url=https%3A%2F%2Fangular.io%2Fpresskit&psig=AOvVaw0sPfIJe--bwUJrL_EcA9hH&ust=1550917445778491', max_length=1000),
        ),
    ]
