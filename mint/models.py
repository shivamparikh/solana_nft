from django.db import models
from django.utils import timezone

# Create your models here.
class Upload(models.Model):
    image = models.ImageField(upload_to='img', blank =True)
    metadata = models.TextField()

class NFT(models.Model):
    sha = models.CharField(max_length=256)
    timestamp = models.DateField('Date Created', default=timezone.now)
