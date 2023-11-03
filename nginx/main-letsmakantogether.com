server {
    listen 80;
    listen [::]:80;
    server_name letsmakantogether.com www.letsmakantogether.com;
    #root /var/www/html/letsmakantogether;
    #index index.html index.nginx-debian.html;

    return 301 https://$server_name;
}


server {
    listen 443 ssl;
    listen [::]:443 ssl;
    include /etc/nginx/snippets/self-signed.conf;
    include /etc/nginx/snippets/ssl-params.conf;

    server_name letsmakantogether.com www.letsmakantogether.com;

    root /var/www/html/letsmakantogether;
    index index.html index.nginx-debian.html;

    location /api {
	add_header Access-Control-Allow-Origin "*" always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Content-Type,Authorization,Origin, X-Requested-With,Accept';
	proxy_pass http://localhost:8080;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}

