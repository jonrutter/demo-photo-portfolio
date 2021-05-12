from django.urls import path
from .views import (
    HomeView, 
    PeopleView, 
    AnimalsView, 
    NatureView,
    WeddingsView, 
    ContactView
)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('people/', PeopleView.as_view(), name='people'),
    path('animals/', AnimalsView.as_view(), name='animals'),
    path('nature/', NatureView.as_view(), name='nature'),
    path('weddings/', WeddingsView.as_view(), name='weddings'),
    path('contact/', ContactView.as_view(), name='contact'),
]