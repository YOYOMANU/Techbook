#!/bin/bash

echo "[start.sh] Techbook service starting..."
PORT=${PORT:-8080}
echo "[start.sh] Listening on port: $PORT"

# Ensure required runtime directories exist
mkdir -p /var/run/php /var/run/nginx /var/log/nginx

# --- 1. Start php-fpm immediately ---
echo "[start.sh] Starting php-fpm..."
php-fpm -D
echo "[start.sh] php-fpm started."

# --- 2. Configure nginx port and start immediately ---
echo "[start.sh] Configuring nginx to listen on port $PORT..."
sed -i "s/listen 80;/listen $PORT;/" /etc/nginx/http.d/default.conf

echo "[start.sh] Testing nginx configuration..."
nginx -t

echo "[start.sh] Starting nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!
echo "[start.sh] nginx started (pid $NGINX_PID)."

# --- 3. Run Laravel bootstrap commands in the background ---
(
    echo "[laravel-bootstrap] Running in background..."

    echo "[laravel-bootstrap] Clearing config cache..."
    php artisan config:clear 2>&1 || echo "[laravel-bootstrap] config:clear failed (non-fatal)"

    echo "[laravel-bootstrap] Caching config..."
    php artisan config:cache 2>&1 || echo "[laravel-bootstrap] config:cache failed (non-fatal)"

    echo "[laravel-bootstrap] Caching routes..."
    php artisan route:cache 2>&1 || echo "[laravel-bootstrap] route:cache failed (non-fatal)"

    echo "[laravel-bootstrap] Caching views..."
    php artisan view:cache 2>&1 || echo "[laravel-bootstrap] view:cache failed (non-fatal)"

    echo "[laravel-bootstrap] Running migrations..."
    php artisan migrate --force 2>&1 || echo "[laravel-bootstrap] migrate failed (non-fatal)"

    echo "[laravel-bootstrap] Seeding database..."
    php artisan db:seed --force 2>&1 || echo "[laravel-bootstrap] db:seed failed (non-fatal)"

    echo "[laravel-bootstrap] Bootstrap complete."
) &

# --- 4. Keep the container alive by waiting on nginx ---
echo "[start.sh] Web server is up. Waiting..."
wait $NGINX_PID

