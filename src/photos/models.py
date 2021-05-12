from django.db import models
from PIL import Image, ImageOps
from easy_thumbnails.signals import saved_file
from easy_thumbnails.signal_handlers import generate_aliases_global

def build_photos_path(instance, filename):
    return 'images/{0}/{1}'.format(instance.category, filename)


class Photo(models.Model):
    image = models.ImageField(upload_to=build_photos_path)
    CATEGORY_CHOICES = [
        ('people', 'people'),
        ('animals', 'animals'),
        ('nature', 'nature & landscapes'),
        ('weddings', 'weddings')
    ]
    category = models.CharField(max_length=8, choices=CATEGORY_CHOICES)
    alt_text = models.CharField('Alternate text for visually impaired users', max_length=200)
    caption = models.CharField('Image caption', max_length=200)
    href = models.URLField('Link to original', max_length=200, null=True, blank=True)

    def __str__(self):
        return self.category + ": " + self.alt_text
    
    class Meta:
        ordering = ["?"]

saved_file.connect(generate_aliases_global)