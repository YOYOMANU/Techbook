FROM php:8.4-fpm-alpine

# Tout dans la même image Alpine = libs compatibles
RUN apk add --no-cache \
    nginx \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    postgresql-dev \
    zip \
    unzip \
    curl \
    bash \
    && docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

COPY conf/nginx/nginx-site.conf /etc/nginx/http.d/default.conf
COPY conf/php-fpm/www.conf /usr/local/etc/php-fpm.d/www.conf

RUN chmod +x /var/www/html/start.sh \
    && mkdir -p /var/run/nginx /var/run/php

ENV PORT=80
EXPOSE 80

CMD ["/var/www/html/start.sh"]