# Generated by Django 2.1.4 on 2019-02-22 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djbr', '0012_reservation'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExampleImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.ImageField(null=True, upload_to='', verbose_name='Avatar')),
            ],
        ),
        migrations.CreateModel(
            name='ExampleModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model_pic', models.ImageField(default='pic_folder/None/no-img.jpg', upload_to='pic_folder/')),
            ],
        ),
        migrations.AddField(
            model_name='book',
            name='avatar',
            field=models.ImageField(null=True, upload_to='', verbose_name='Avatar'),
        ),
    ]
