#!/usr/bin/env bash

echo "==> Installing dependencies..."
composer install --no-dev --optimize-autoloader --working-dir=/var/www/html

echo "==> Caching config & routes..."
php artisan config:cache
php artisan route:cache

echo "==> Running migrations..."
php artisan migrate --force
