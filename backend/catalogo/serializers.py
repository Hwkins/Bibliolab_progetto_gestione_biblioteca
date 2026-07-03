from rest_framework import serializers
from .models import Autore, Libro
from django.contrib.auth.models import User
from .models import UserProfile


# Serializer usato per esporre i dati degli autori tramite l'API REST.
class AutoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autore
        fields = '__all__'

# Serializer usato per esporre i dati dei libri.
# Il nome dell'autore viene incluso come campo di sola lettura per semplificare il frontend.
class LibroSerializer(serializers.ModelSerializer):
    autore_nome = serializers.CharField(
        source = 'autore.nome',
        read_only = True
    )

    class Meta:
        model = Libro
        fields = [
            'id',
            'titolo',
            'anno',
            'genere',
            'autore',
            'autore_nome'
        ]



# Serializer per la registrazione degli utenti.
# Valida i dati in ingresso e crea un nuovo utente usando il modello utente sicuro di Django.
class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password"
        ]

    def validate_username(self, value):

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username già utilizzato"
            )

        return value

    def validate_email(self, value):

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email già utilizzata"
            )

        return value

    

    def create(self, validated_data):

        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
    
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
        ]

class UserProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    email = serializers.CharField(
        source="user.email",
        read_only=True
    )

    class Meta:
        model = UserProfile

        fields = [
            "username",
            "email",
            "role",
            "created_at",
            "updated_at",
        ]