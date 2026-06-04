#!/bin/bash

echo "========================================="
echo "  Techbook service starting up"
echo "========================================="

# Default PORT to 8080 if Railway hasn't set it
PORT=${PORT:-8080}
echo "[init] PORT=$PORT"

# Ensure required runtime directories exist
mkdir -p /var/run/php /var/run/nginx
echo "[init] Runtime directories ready"

# ---------------------------------------------------------------------------
# Laravel bootstrap — failures are logged but never abort startup
# ---------------------------------------------------------------------------
echo "[laravel] Caching config..."
php artisan config:cache 2>&1 && echo "[laravel] config:cache OK" || echo "[laravel] config:cache FAILED (non-fatal)"

echo "[laravel] Caching routes..."
php artisan route:cache 2>&1 && echo "[laravel] route:cache OK" || echo "[laravel] route:cache FAILED (non-fatal)"

echo "[laravel] Caching views..."
php artisan view:cache 2>&1 && echo "[laravel] view:cache OK" || echo "[laravel] view:cache FAILED (non-fatal)"

echo "[laravel] Running migrations..."
php artisan migrate --force 2>&1 && echo "[laravel] migrate OK" || echo "[laravel] migrate FAILED (non-fatal)"

echo "[laravel] Seeding database..."
php artisan db:seed --force 2>&1 && echo "[laravel] db:seed OK" || echo "[laravel] db:seed FAILED (non-fatal)"

# ---------------------------------------------------------------------------
# php-fpm
# ---------------------------------------------------------------------------
echo "[php-fpm] Starting php-fpm in background..."
php-fpm -D
echo "[php-fpm] Waiting for php-fpm socket to become ready..."
for i in $(seq 1 10); do
    if [ -S /var/run/php/php8.4-fpm.sock ]; then
        echo "[php-fpm] Socket ready after ${i}s"
        break
    fi
    echo "[php-fpm] Waiting... (${i}/10)"
    sleep 1
done
if [ ! -S /var/run/php/php8.4-fpm.sock ]; then
    echo "[php-fpm] WARNING: Socket not found after 10s — nginx may fail to connect"
fi

# ---------------------------------------------------------------------------
# nginx — patch the port and validate before starting
# ---------------------------------------------------------------------------
NGINX_CONF="/etc/nginx/http.d/default.conf"
echo "[nginx] Patching $NGINX_CONF to listen on port $PORT..."
if sed -i "s/listen 80;/listen ${PORT};/g" "$NGINX_CONF"; then
    echo "[nginx] Port patch applied successfully"
else
    echo "[nginx] ERROR: sed failed to patch nginx config"
    exit 1
fi

echo "[nginx] Effective listen directives:"
grep "listen" "$NGINX_CONF"

echo "[nginx] Validating nginx configuration..."
if nginx -t 2>&1; then
    echo "[nginx] Configuration valid"
else
    echo "[nginx] ERROR: nginx configuration is invalid — aborting"
    exit 1
fi

echo "[nginx] Starting nginx (foreground)..."
exec nginx -g "daemon off;"

