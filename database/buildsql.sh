#!/bin/bash
docker rm -f mysql
docker build -t mysql .
docker run --name mysql -p 127.0.0.1:3306:3306 -v /etc/localtime:/etc/localtime:ro --user mysql -e MYSQL_ROOT_PASSWORD=mysql -e MYSQL_PASSWORD=mysql -d mysql
docker exec -it mysql /bin/bash
