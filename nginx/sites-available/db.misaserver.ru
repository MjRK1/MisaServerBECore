server {
        listen 80;

        location / {
                proxy_pass http://misa_postgres:5432;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}
