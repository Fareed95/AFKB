#!/bin/bash

# Wait for the database to be ready (optional, adjust as needed)
# For example, using a wait-for-it script or similar is common
# ./wait-for-it.sh db:5432 --
echo "Installing WeasyPrint dependencies..."
sudo apt install libpango-1.0-0 libgdk-pixbuf2.0-dev libffi-dev libcairo2 -y


# Run migrations
# python manage.py migrate

# Collect static files (optional, if you are using Django's static files)
python manage.py collectstatic --noinput

# Start Gunicorn
exec gunicorn --workers 3 --bind 0.0.0.0:8000 server.wsgi:application
