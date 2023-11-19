#!/bin/bash


docker build -t node --progress=plain -f Dockerfile-Node  .
docker run -d --name node -v /etc/localtime:/etc/localtime:ro -p 5000:5000 node
