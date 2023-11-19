#!/bin/bash


# Run All Copy

# To Delete This Part Once no More Edting #
# Copying all testing environment files, have to modify certain code to adjust to production

# Frontend
rm -rf ./vue
mkdir ./vue/
cp -f index.html ./vue/
cp -f package.json ./vue/
cp -f package-lock.json ./vue/
cp -f vite.config.js ./vue/
cp -rf src ./vue/

# Backend
rm -rf ./server
mkdir ./server
cp -rf ./vue/src/server/* ./server/
rm -rf ./vue/src/server

#########################################


# Do Not Delete the Code Below only Above

# Copy all the relevant frontend files (Vue & Nginx)
rm -rf ./docker/nginx/vue
cp -rf vue ./docker/nginx/
cp -rf nginx/* ./docker/nginx/

# Copy All the Relevant Node.js files for server
rm -rf ./docker/node/server
cp -rf server ./docker/node/server/

# Copy All the Relevant Database File
rm -rf ./docker/mysql/letsmakantogether_mysql.sql
cp -rf ./database/* ./docker/mysql/
