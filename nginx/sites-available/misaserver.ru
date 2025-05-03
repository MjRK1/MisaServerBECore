
      server {
        listen 80;

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
      }

