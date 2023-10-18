#!/bin/bash

npm i
npm run build
sudo cp -r ./dist /var/www/html/letsmakantogether
