from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    profile_pic = models.ImageField(upload_to="profile_photos/", blank=True, null=True, default='defaul.jpg')
    
    REQUIRED_FIELDS = ['email']
    USERNAME_FIELD = 'username'
    
    def __str__(self):
        return f'{self.username}'
    

# from django.db import models
# from django.contrib.auth.models import User

# class UserProfile(models.Model):
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)
#     phone_number = models.CharField(max_length=20, blank=True)
#     bio = models.TextField(blank=True)

#     def __str__(self):
#         return f'{self.user.username} Profile'