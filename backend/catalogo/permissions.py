from rest_framework.permissions import BasePermission


# Permette la lettura a chiunque sia autenticato.
# Solo bibliotecari e admin possono eseguire operazioni di scrittura.
class IsLibrarianOrAdmin(BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        profile = request.user.profile

        return profile.role in [
            "librarian",
            "admin",
        ]


# Restrizione aggiuntiva per le operazioni di eliminazione.
# Anche se un utente può modificare i record, solo gli admin possono rimuoverli definitivamente.
class IsAdminForDelete(BasePermission):

    def has_permission(self, request, view):

        if request.method != "DELETE":
            return True

        return (
            request.user.is_authenticated
            and request.user.profile.role == "admin"
        )