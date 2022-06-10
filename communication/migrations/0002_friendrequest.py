# Generated by Django 4.0.5 on 2022-06-10 06:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('communication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FriendRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accepted', models.BooleanField(blank=True, default=None, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('receiver', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='friend_requests_received', to='communication.account')),
                ('requester', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='friend_requests_sent', to='communication.account')),
            ],
        ),
    ]
