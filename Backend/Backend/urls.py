"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from AgroMatch.views import RegisterView,LoginView,PredictionView,Dashboard,LogOut,ManageAccount

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/',RegisterView.as_view()),
    path('login/',LoginView.as_view()),
    path('crop_prediction/',PredictionView.as_view()),
    path('dashboard/',Dashboard.as_view()),
    path('logout/',LogOut.as_view()),
    path('account/',ManageAccount.as_view()),
]
