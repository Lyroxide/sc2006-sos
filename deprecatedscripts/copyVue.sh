#!/bin/bash


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
