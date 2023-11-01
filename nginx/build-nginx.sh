#!/bin/bash

cp main-nginx.conf nginx.conf
IPNode=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' node)
sed -i 's/0.0.0.0/'$IPNode'/' nginx.conf
cp main-openssl.cnf openssl.cnf
VMip=$(ip addr show ens33 | grep 'inet ' | awk '{print $2}' | cut -f1 -d'/')
sed -i 's/0.0.0.0/'$VMip'/' openssl.cnf

docker build -t nginx --progress=plain -f Dockerfile-Nginx  .
docker run -d --name nginx -v /etc/localtime:/etc/localtime:ro -p 80:80 -p 443:443 nginx
