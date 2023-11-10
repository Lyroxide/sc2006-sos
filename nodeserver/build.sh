#!/bin/bash

#sudo apt update
cp -r ../src/server/* ../nodeserver
cp ../package.json ./
npm i
node server.js
