#!/bin/bash

docker stop node
docker stop nginx
docker rm node
docker rm nginx

./build-node.sh

./build-nginx.sh
