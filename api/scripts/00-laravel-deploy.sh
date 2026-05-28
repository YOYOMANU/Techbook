#!/usr/bin/env bash

echo "==> Installing composer dependencies..."
composer install --no-dev --optimize-autoloader

echo "==> Generating app key if missing..."
php artisan key:generate --force

echo "==> Caching config & routes..."
php artisan config:cache
php artisan route:cache

echo "==> Running migrations..."
php artisan migrate --force
