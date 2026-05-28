#!/bin/bash
php-fpm -D
service nginx start
tail -f /var/log/nginx/error.log
