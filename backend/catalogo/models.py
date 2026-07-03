from django.db import models
from django.contrib.auth.models import User


# UserProfile estende il modello utente di Django con dati specifici dell'applicazione.
# Questo permette di salvare un ruolo (reader, librarian, admin) senza modificare
# il modello di autenticazione di base. (da creare app dedicata)
class UserProfile(models.Model):

    ROLE_CHOICES = [
        ("reader", "Reader"),
        ("librarian", "Librarian"),
        ("admin", "Admin"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="reader"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.user.username


# Entità autore nel catalogo.
# Ogni autore può essere associato a molti libri.
class Autore(models.Model): 
    nome = models.CharField(max_length=100) 
    nazione = models.CharField(max_length=60)

    # La rappresentazione testuale viene usata nel pannello admin e nei log di debug.
    def __str__(self):
        return self.nome 
    
    class Meta:
        verbose_name_plural = "Autori"
    
# Entità libro.
# Un libro appartiene a un solo autore tramite relazione foreign key.
class Libro(models.Model): 
    titolo = models.CharField(max_length=200) 
    anno = models.IntegerField() 
    genere = models.CharField(max_length=60) 
    autore = models.ForeignKey( Autore, on_delete=models.CASCADE )

    # Il titolo è l'identificatore leggibile mostrato nei form e nei log.
    def __str__(self):
        return self.titolo
    
    class Meta:
        verbose_name_plural = "Libri"