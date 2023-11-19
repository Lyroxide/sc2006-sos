#!/bin/bash

npm i
npm run build
sudo rm -r /var/www/html/letsmakantogether/*
sudo cp -r ./dist/* /var/www/html/letsmakantogether/
