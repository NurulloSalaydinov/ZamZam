from django.contrib import admin
from django.urls import path

from main import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('login/', views.Login.as_view(), name='login'),
    path('delete/<int:pk>/', views.delete, name='delete'),
    path('update/<int:pk>/', views.update, name='update'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('new-order/', views.new_order, name='new_order'),
    path('new-contact/', views.new_contact, name='new_contact'),
    path('admin/', admin.site.urls),
]
