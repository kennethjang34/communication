# Generated by Django 4.0.4 on 2022-05-24 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_alter_account_user_alter_chat_messages'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='channel_name',
            field=models.CharField(default='', max_length=100),
        ),
    ]
