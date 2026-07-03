# Bibliolab

Applicazione full-stack per gestire un catalogo di libri e autori, con backend Django REST API e frontend Vue 3.

## Tecnologie utilizzate

- **Backend**: Django, Django REST Framework, JWT, PostgreSQL
- **Frontend**: Vue 3, Vite, Pinia, Vue Router, Bootstrap
- **Containerizzazione**: Docker Compose

## Struttura del progetto

- `backend/` → API REST Django
- `frontend/` → applicazione Vue
- `docker-compose.yml` → orchestrazione dei servizi

## Requisiti

- Docker
- Docker Compose
- Node.js (solo se vuoi eseguire il frontend senza Docker)
- Python 3.12 (solo se vuoi eseguire il backend senza Docker)

## Configurazione ambiente

Crea un file `.env` nella root del progetto con le seguenti variabili:

```env
POSTGRES_DB=bibliolab_db
POSTGRES_USER=bibliolab_user
POSTGRES_PASSWORD=bibliolab_password
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=True
```

## Avvio con Docker Compose

```bash
docker compose up --build
```

Dopo l’avvio:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Swagger UI: http://localhost:8000/api/schema/swagger-ui/

## Avvio manuale del backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # su Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Avvio manuale del frontend

```bash
cd frontend
npm install
npm run dev
```

## Funzionalità principali

- Login e registrazione utenti
- Gestione autori
- Gestione libri
- Visualizzazione profilo utente
- Dashboard con statistiche principali
- Controllo accessi tramite ruolo (reader, librarian, admin)

## API principali

- `POST /api/register/` → registrazione utente
- `POST /api/token/` → login
- `POST /api/token/refresh/` → refresh token
- `GET /api/autori/` → lista autori
- `GET /api/libri/` → lista libri
- `GET /api/profile/` → profilo utente
- `GET /api/dashboard/` → statistiche dashboard

## Note di sviluppo

- Il backend usa JWT per l’autenticazione.
- Il frontend usa Pinia per la gestione dello stato.
- Il database principale è PostgreSQL.

## Contributi

Per contribuire al progetto, crea un branch separato e apri una pull request.
