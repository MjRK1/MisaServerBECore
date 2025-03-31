FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY sites-available/ /etc/nginx/sites-available/
COPY sites-enabled/ /etc/nginx/sites-enabled/
COPY ssl/ /etc/nginx/ssl/

RUN mkdir -p /var/log/nginx && chmod -R 755 /var/log/nginx

CMD ["nginx", "-g", "daemon off;"]
