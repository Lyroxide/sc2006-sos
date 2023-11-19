#!/bin/bash


# Copy all the relevant frontend files (Vue & Nginx)
rm -rf ./docker/nginx/vue
cp -rf vue ./docker/nginx/
cp -rf nginx/* ./docker/nginx/
