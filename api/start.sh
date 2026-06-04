#!/bin/bash
set -e

echo "Starting Techbook service..."
PORT=${PORT:-8080}
echo "PORT: $PORT"

# Ensure required runtime directories exist
mkdir -p /var/run/nginx /var/run/php /var/log/nginx

# 1. Start php-fpm in the background
echo "Starting php-fpm..."
php-fpm -D

# 2. Patch nginx to listen on the dynamic port
echo "Configuring nginx port to $PORT..."
sed -i "s/listen 80;/listen $PORT;/" /etc/nginx/http.d/default.conf

# Verify the config is valid before handing off
nginx -t

# 3. Run Laravel bootstrap tasks in the background so they never block nginx
(
    echo "[bootstrap] Caching config..."
    php /var/www/html/artisan config:cache  || true
    echo "[bootstrap] Caching routes..."
    php /var/www/html/artisan route:cache   || true
    echo "[bootstrap] Caching views..."
    php /var/www/html/artisan view:cache    || true
    echo "[bootstrap] Running migrations..."
    php /var/www/html/artisan migrate --force || true
    echo "[bootstrap] Seeding database..."
    php /var/www/html/artisan db:seed --force || true
    echo "[bootstrap] Done."
) &

# 4. Hand the process over to nginx — becomes PID 1, all output captured
echo "Starting nginx..."
exec nginx -g "daemon off;"

