from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('uploads/', views.UploadView.as_view(), name= 'uploads_list'),
]
