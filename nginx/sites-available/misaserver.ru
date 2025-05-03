
      server {
        listen 443 ssl;
        server_name misaserver.ru;
        client_max_body_size 100M;

        ssl_certificate /etc/nginx/ssl/fullchain.crt;
        ssl_certificate_key /etc/nginx/ssl/certificate.key;

        location /core/ {
#                 rewrite ^/core/(.*)$ /$1 break;
                proxy_pass http://MisaServerCoreFE:8080;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /files/ {
#                 rewrite ^/files/(.*)$ /$1 break;
                proxy_pass http://MisaFilesFE:8081;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /media/ {
            proxy_pass http://MisaMedia:5000/api/socket;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
             proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
        }
      }

