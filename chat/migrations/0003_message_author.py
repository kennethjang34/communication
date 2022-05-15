# Generated by Django 4.0.4 on 2022-05-14 18:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_remove_account_friends_account_following'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='author',
            field=models.ForeignKey(default='admin', on_delete=django.db.models.deletion.CASCADE, related_name='messages_sent', to='chat.account'),
        ),
    ]