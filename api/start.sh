#!/bin/bash
set -e

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
sed -i "s/listen 80;/listen ${PORT:-80};/" /etc/nginx/http.d/default.conf
nginx -g "daemon off;"

