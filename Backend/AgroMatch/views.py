from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializer import RegistrationSerializer,UserPredictedSerializer,LoginSerializer,UserSerializer
from rest_framework.response import Response
from .predictions import crop_prediction
from .models import PredictedCrop
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication

from rest_framework.authtoken.models import Token

class RegisterView(APIView):
    
    def post(self,request):
        data=request.data
        print(data)
        serializer=RegistrationSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response("Register successfully")
        return Response(serializer.errors)
    
class LoginView(APIView):

    def post(self,request):
        data=request.data
        username=data.get('username')
        password=data.get('password')
        serializer=LoginSerializer(data=data)
        if serializer.is_valid():
            user=authenticate(username=username,password=password)
            if user:
                token,_=Token.objects.get_or_create(user=user)
                data=UserSerializer(user).data
                data['token']=token.key
                data['success']=True
                return Response(data)
            return Response({"message":"Invalid credentials","success":False})
        return Response(serializer.errors)

class Dashboard(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self,request):
        user=request.user
        serializer=UserSerializer(user)
        return Response(serializer.data)


class LogOut(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
    def post(self,request):
        if request.user.is_authenticated:
            request.user.auth_token.delete()
            return Response({"message":"Logout successfully"})
        return Response({"message": "You are not logged in"}, status=401)

class PredictionView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
    def post(self,request):
        data=request.data
        if data:
            predicted_crop=crop_prediction(data)
            PredictedCrop.objects.create(
                user=request.user,
                input_data=data,
                predicted_crop=predicted_crop.get("crop","")
            )
            return Response(predicted_crop)
        return Response("Need the proper parameters to predict suitable crop")
    
    def get(self,request):
        predictions=PredictedCrop.objects.all().order_by('-predicted_at')
        serializer=UserPredictedSerializer(predictions,many=True)
        return Response(serializer.data)



