#!/bin/bash
set -e

echo "Starting Techbook service..."
PORT=${PORT:-8080}
echo "PORT environment variable: $PORT"

# Cache Laravel
echo "Caching Laravel config..."
php artisan config:cache || true
echo "Caching Laravel routes..."
php artisan route:cache || true
echo "Caching Laravel views..."
php artisan view:cache || true

# Migrations
echo "Running migrations..."
php artisan migrate --force || true

# Remplir la BDD
echo "Seeding database..."
php artisan db:seed --force || true

# Créer le dossier du socket php-fpm
mkdir -p /var/run/php

# Démarrer php-fpm en arrière-plan
echo "Starting php-fpm..."
php-fpm -D

# Configurer nginx pour écouter sur le port dynamique
echo "Configuring nginx to listen on port $PORT..."
sed -i "s/listen 80;/listen $PORT;/" /etc/nginx/http.d/default.conf
echo "Nginx config after sed:"
grep "listen" /etc/nginx/http.d/default.conf

# Tester la configuration nginx
echo "Testing nginx configuration..."
nginx -t

echo "Starting nginx..."
exec nginx -g "daemon off;"

