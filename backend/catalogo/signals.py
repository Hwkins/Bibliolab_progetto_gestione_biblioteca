from django.db.models.signals import post_save
from django.dispatch import receiver

from django.contrib.auth.models import User

from .models import UserProfile


# Ogni volta che viene creato un nuovo utente Django, viene creato anche un profilo corrispondente.
# In questo modo ogni utente riceve subito un ruolo predefinito.
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):

    if created:

        role = "admin" if instance.is_superuser else "reader"

        UserProfile.objects.create(
            user=instance,
            role=role
        )