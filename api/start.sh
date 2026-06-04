#!/bin/bash
set -e

echo "Starting Techbook service..."
PORT=${PORT:-8080}
echo "PORT environment variable: $PORT"

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

# Configurer nginx pour écouter sur le port dynamique
echo "Configuring nginx to listen on port $PORT..."
sed -i "s/listen 80;/listen $PORT;/" /etc/nginx/http.d/default.conf
echo "Nginx config after sed:"
grep "listen" /etc/nginx/http.d/default.conf

echo "Starting nginx..."
nginx -g "daemon off;"

