#!/bin/bash

# Permissions storage
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache

# Migrations
php /var/www/html/artisan migrate --force

# Seeders
php /var/www/html/artisan db:seed --force

# Démarrage
php-fpm -D
service nginx start
tail -f /var/log/nginx/error.log
