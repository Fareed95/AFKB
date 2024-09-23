# Generated by Django 4.2.6 on 2024-09-23 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0004_rename_shops_shops_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='shops',
            name='remaining_balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
        migrations.AddField(
            model_name='shops',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
    ]
