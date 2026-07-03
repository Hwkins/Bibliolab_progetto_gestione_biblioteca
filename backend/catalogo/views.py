from django.shortcuts import render

from rest_framework import generics, viewsets
from .models import Autore, Libro, UserProfile
from .serializers import (
    AutoreSerializer, 
    LibroSerializer, 
    RegisterSerializer, 
    UserSerializer, 
    UserProfileSerializer
)
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import (
    IsLibrarianOrAdmin,
    IsAdminForDelete,
)

# API CRUD per gli autori.
# ModelViewSet fornisce automaticamente endpoint per list/create/retrieve/update/delete.
class AutoreViewSet(viewsets.ModelViewSet):

    queryset = Autore.objects.all()

    serializer_class = AutoreSerializer

    permission_classes = [
        IsLibrarianOrAdmin,
        IsAdminForDelete,
    ]

# API CRUD per i libri.
# La view abilita anche filtri, ricerca e ordinamento per il frontend.
class LibroViewSet(viewsets.ModelViewSet):

    queryset = Libro.objects.all()

    serializer_class = LibroSerializer

    permission_classes = [
        IsLibrarianOrAdmin,
        IsAdminForDelete,
    ]

    filterset_fields = [
        'genere',
        'autore'
    ]

    search_fields = [
        'titolo',
        'autore__nome'
    ]

    ordering_fields = [
        'anno',
        'titolo'
    ]

# Endpoint pubblico per la registrazione degli utenti.
# Questa view è volutamente accessibile anche a client non autenticati.
class RegisterView(generics.CreateAPIView):

    permission_classes = [AllowAny]

    queryset = User.objects.all()

    serializer_class = RegisterSerializer

# Restituisce i contatori aggregati usati dalla pagina dashboard iniziale.
class DashboardStatsView(APIView):

    def get(self, request):

        return Response({
            "books_count": Libro.objects.count(),
            "authors_count": Autore.objects.count(),
            "username": request.user.username,
        })
    
# Restituisce le informazioni dell'utente autenticato corrente.
class MeView(APIView):

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)
    


# Restituisce il profilo utente insieme al ruolo assegnato.
class ProfileView(APIView):

    def get(self, request):

        profile, created = UserProfile.objects.get_or_create(
            user=request.user
        )

        serializer = UserProfileSerializer(profile)

        return Response(serializer.data)