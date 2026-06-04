#!/bin/bash
set -e

echo "Starting Techbook service..."
echo "PORT environment variable: ${PORT:-80}"

# Cache Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Migrations
php artisan migrate --force

# Remplir la BDD
php artisan db:seed --force 

# Créer le dossier du socket php-fpm
mkdir -p /var/run/php

# Démarrer php-fpm en arrière-plan
php-fpm -D

# Démarrer nginx au premier plan avec le port dynamique
echo "Configuring nginx to listen on port ${PORT:-80}..."
sed -i "s/listen 80;/listen ${PORT:-80};/" /etc/nginx/http.d/default.conf
echo "Nginx config after sed:"
grep "listen" /etc/nginx/http.d/default.conf

echo "Starting nginx..."
nginx -g "daemon off;"

