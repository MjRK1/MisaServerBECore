FROM nginx:latest

# Копируем базовый конфиг Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Создаём папку для виртуальных хостов
RUN mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled /etc/nginx/ssl

# Копируем сертификаты (если их хранишь локально)
COPY ssl/nginx.crt /etc/nginx/ssl/nginx.crt
COPY ssl/nginx.key /etc/nginx/ssl/nginx.key

# Копируем виртуальные хосты
COPY sites-available/ /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/api.misaserver.ru /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/db.misaserver.ru /etc/nginx/sites-enabled/

# Открываем порты
EXPOSE 443

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
