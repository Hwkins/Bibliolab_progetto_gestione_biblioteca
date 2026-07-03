#!/bin/sh

set -e

echo "Eseguo le migrazioni..."

python manage.py migrate --noinput

echo "Avvio Gunicorn..."

exec gunicorn bibliolab.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3