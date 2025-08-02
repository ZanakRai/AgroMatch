from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class PredictedCrop(models.Model):
    user=models.ForeignKey(User,related_name='predicted',on_delete=models.CASCADE)
    input_data=models.JSONField()
    predicted_crop=models.CharField(max_length=20)
    predicted_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Crop Recommendation: {self.predicted_crop}'
    