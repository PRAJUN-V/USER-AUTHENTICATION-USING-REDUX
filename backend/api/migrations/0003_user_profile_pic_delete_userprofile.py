# Generated by Django 5.0.4 on 2024-04-12 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to='profile_photos/'),
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
