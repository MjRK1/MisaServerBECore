
      server {
        listen 443 ssl;
        server_name api.misaserver.ru;
        client_max_body_size 100M;

        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;

        location /core/ {
                rewrite ^/core/(.*)$ /$1 break;
                proxy_pass http://MisaServerCoreBE:5000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

#         location /files/ {
#                 rewrite ^/files/(.*)$ /$1 break;
#                 proxy_pass http://MisaFilesBE:5002;
#                 proxy_set_header Host $host;
#                 proxy_set_header X-Real-IP $remote_addr;
#                 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         }
      }
    
