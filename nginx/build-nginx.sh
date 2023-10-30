#!/bin/bash


docker build -t nginx --progress=plain -f Dockerfile-Nginx  .
docker run -d --name nginx -v /etc/localtime:/etc/localtime:ro -p 80:80 -p 443:443 nginx
