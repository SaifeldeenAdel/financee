# Generated by Django 3.1.6 on 2021-03-16 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20210315_1114'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tradebill',
            name='hard_stop',
        ),
        migrations.AlterField(
            model_name='tradebill',
            name='risk',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
