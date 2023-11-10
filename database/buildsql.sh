#!/bin/bash
docker rm -f mysql
docker build -t mysql --progress=plain -f Dockerfile-Mysql  .
docker run --name mysql -v /etc/localtime:/etc/localtime:ro --user mysql --env="MYSQL_TCP_PORT=3306" -e MYSQL_ROOT_PASSWORD=123456789 -e MYSQL_PASSWORD=123456789 -d mysql
#docker exec -it mysql /bin/bash

