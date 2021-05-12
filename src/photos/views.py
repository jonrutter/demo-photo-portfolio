from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.views.generic import ListView
from .models import Photo

# Create your views here.

class HomeView(TemplateView):
    template_name = 'photos/home.html'


class PeopleView(ListView):
    queryset = Photo.objects.filter(category='people')
    context_object_name = 'photos'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'People'
        return context


class AnimalsView(ListView):
    queryset = Photo.objects.filter(category='animals')
    context_object_name = 'photos'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Animals'
        return context


class NatureView(ListView):
    queryset = Photo.objects.filter(category='nature')
    context_object_name = 'photos'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Nature & Landscapes'
        return context


class WeddingsView(ListView):
    queryset = Photo.objects.filter(category='weddings')
    context_object_name = 'photos'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Weddings'
        return context


class ContactView(TemplateView):
    template_name = 'photos/contact.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Contact'
        return context
