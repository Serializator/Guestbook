FROM nginx:1.11
COPY fastcgi.conf /etc/nginx/fastcgi.conf
COPY fastcgi-php.conf /etc/nginx/snippets/fastcgi-php.conf
COPY vhost.conf /etc/nginx/conf.d/default.conf
WORKDIR /app
