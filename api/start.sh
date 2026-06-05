#!/bin/bash
set -e

echo "Starting Techbook service..."

PORT=${PORT:-8080}
echo "PORT: $PORT"

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


# Seed (non bloquant si échec)
php artisan db:seed --force || echo "⚠️ Seed skipped or failed, continuing..."

# Socket php-fpm
mkdir -p /var/run/php
# Démarrer php-fpm
php-fpm -D

# Attendre que le socket soit prêt
sleep 1

# Injecter le PORT dans la config nginx
sed -i "s/listen 8080;/listen $PORT;/" /etc/nginx/http.d/default.conf

echo "Nginx listen config:"
grep "listen" /etc/nginx/http.d/default.conf

echo "Starting nginx..."
exec nginx -g "daemon off;"

