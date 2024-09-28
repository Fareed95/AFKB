# Generated by Django 4.2.6 on 2024-09-25 02:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0005_shops_remaining_balance_shops_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='shops',
            name='amount_to_bill',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='shops',
            name='pants_price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='shops',
            name='remaining_balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='shops',
            name='safari_price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='shops',
            name='shirt_price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='shops',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
