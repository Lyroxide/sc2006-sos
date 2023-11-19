#!/bin/bash


cp build-nginx.sh Dockerfile-Nginx ../nginx/
cp build-node.sh Dockerfile-Node ../node/
cp buildsql.sh Dockerfile-Mysql docker-entrypoint.sh ../mysql
