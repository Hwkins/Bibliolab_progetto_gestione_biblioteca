from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    AutoreViewSet,
    DashboardStatsView,
    LibroViewSet,
    MeView,
    ProfileView,
    RegisterView,
)

# DefaultRouter crea automaticamente gli endpoint CRUD per i modelli del catalogo.
# In questo modo l'API mantiene una struttura consistente e riduce il codice ripetitivo.
router = DefaultRouter()
router.register('autori', AutoreViewSet)
router.register('libri', LibroViewSet)

# Endpoint personalizzati non coperti dal router.
# Servono per autenticazione, informazioni sul profilo e metriche della dashboard.
urlpatterns = router.urls + [
    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),
    path(
        "dashboard/",
        DashboardStatsView.as_view(),
        name="dashboard"
    ),
    path(
        "me/",
        MeView.as_view(),
        name="me"
    ),
    path(
        "profile/",
        ProfileView.as_view(),
        name="profile"
    ),
]