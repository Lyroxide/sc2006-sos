#!/bin/bash

rm -rf ./nginx/vue
mkdir ./nginx/vue
cp -f app.js ./nginx/vue/
#cp -rf node_modules ./vue/
cp -f index.html ./nginx/vue/
cp -f package.json ./nginx/vue/
cp -f package-lock.json ./nginx/vue/
cp -f vite.config.js ./nginx/vue/
cp -rf src ./nginx/vue/
