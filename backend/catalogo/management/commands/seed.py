from django.core.management.base import BaseCommand
from catalogo.models import Autore, Libro


# Comando personalizzato per popolare il database con dati di esempio. Eseguire ("docker compose exec backend python manage.py seed") per popolare il db
class Command(BaseCommand):
    help = "Popola il database con dati di test"

    def handle(self, *args, **kwargs):
        # Prima creiamo gli autori, perché ogni libro deve essere collegato a uno di essi.
        self.stdout.write("Creazione autori...")

        autori_data = [
            ("Italo Calvino", "Italia"),
            ("Umberto Eco", "Italia"),
            ("George Orwell", "Regno Unito"),
            ("J.R.R. Tolkien", "Regno Unito"),
            ("Isaac Asimov", "USA"),
        ]

        autori = {}

        for nome, nazione in autori_data:
            autore, created = Autore.objects.get_or_create(
                nome=nome,
                defaults={"nazione": nazione}
            )

            autori[nome] = autore

            if created:
                self.stdout.write(
                    self.style.SUCCESS(f"Creato autore: {nome}")
                )

        # Dopo gli autori, inseriamo i libri di esempio nel catalogo.
        self.stdout.write("Creazione libri...")

        libri_data = [
            ("Il barone rampante", 1957, "Romanzo", "Italo Calvino"),
            ("Le città invisibili", 1972, "Romanzo", "Italo Calvino"),
            ("Il nome della rosa", 1980, "Giallo", "Umberto Eco"),
            ("Baudolino", 2000, "Storico", "Umberto Eco"),
            ("1984", 1949, "Distopico", "George Orwell"),
            ("La fattoria degli animali", 1945, "Satira", "George Orwell"),
            ("Lo Hobbit", 1937, "Fantasy", "J.R.R. Tolkien"),
            ("Il Signore degli Anelli", 1954, "Fantasy", "J.R.R. Tolkien"),
            ("Fondazione", 1951, "Fantascienza", "Isaac Asimov"),
            ("Io, Robot", 1950, "Fantascienza", "Isaac Asimov"),
        ]

        for titolo, anno, genere, autore_nome in libri_data:
            libro, created = Libro.objects.get_or_create(
                titolo=titolo,
                defaults={
                    "anno": anno,
                    "genere": genere,
                    "autore": autori[autore_nome]
                }
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(f"Creato libro: {titolo}")
                )

        self.stdout.write(
            self.style.SUCCESS("Database popolato correttamente!")
        )