from django.db import models

# Create your models here.

class TestModel(models.Model):
    test_text = models.CharField(max_length=200)
    test_stuff = models.CharField(max_length=200)
    test_date_autonow = models.DateField(auto_now=True)
    test_date_autonowadd = models.DateField(auto_now_add=True)