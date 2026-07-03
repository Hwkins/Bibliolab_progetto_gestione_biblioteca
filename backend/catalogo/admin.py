from django.contrib import admin
from .models import Autore, Libro

# Register your models here.


@admin.register(Autore)
class AutoreAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'nazione']
    search_fields = ['nome', 'nazione']

@admin.register(Libro)
class LibroAdmin(admin.ModelAdmin):
    list_display = ['id', 'titolo', 'anno', 'genere', 'autore']
    search_fields = ['titolo', 'genere']
    list_filter = ['genere', 'autore']