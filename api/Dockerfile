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

RUN chmod +x /var/www/html/start.sh

ENV PORT=80
EXPOSE 80

CMD ["/var/www/html/start.sh"]
