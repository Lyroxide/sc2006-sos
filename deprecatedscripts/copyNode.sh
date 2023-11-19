#!/bin/bash


# Copy All the Relevant Node.js files for server
shopt -s extglob
rm -rf ./docker/node/!(build-node.sh|Dockerfile-Node)
cp -rf server/* ./docker/node/
