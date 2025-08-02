from rest_framework import serializers
from django.contrib.auth.models import User
from.models import PredictedCrop



class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username','email','password','confirm_password']


    def validate(self, data):
        if data['username']:
           if User.objects.filter(username=data['username']).exists():
               raise serializers.ValidationError('Username already exists')
           
        if data['email']:
            if User.objects.filter(email=data['email']).exists():
                raise serializers.ValidationError('Email already exists')
            
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({'password': 'Passwords do not match'})

            
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user=User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
            
        )

        return user
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','email']


class LoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField()


class UserPredictedSerializer(serializers.ModelSerializer):
    class Meta:
        model=PredictedCrop
        fields="__all__"
