from django.db import models
from user.models import User

class Shops(models.Model):
    name = models.CharField(max_length=50)
    description =  models.TextField()
    shirt_price = models.DecimalField( max_digits=5, decimal_places=2)
    pants_price = models.DecimalField( max_digits=5, decimal_places=2)
    safari_price = models.DecimalField( max_digits=5, decimal_places=2)
    user = models.ForeignKey(User,related_name='shops', on_delete=models.CASCADE)


    def  __str__(self):
        return self.name 