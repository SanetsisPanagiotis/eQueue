# Generated by Django 2.1.4 on 2018-12-30 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djbr', '0010_auto_20181230_1022'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('text', models.CharField(max_length=2000)),
            ],
        ),
    ]
