FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    curl \
    && docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader

COPY conf/nginx/nginx-site.conf /etc/nginx/sites-available/default

RUN echo '#!/bin/bash\nphp-fpm -D\nservice nginx start\ntail -f /var/log/nginx/error.log' > /start.sh \
    && chmod +x /start.sh

ENV PORT=80
EXPOSE 80

CMD ["/start.sh"]
