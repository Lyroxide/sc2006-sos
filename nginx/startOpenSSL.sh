#!/bin/bash

sudo apt-get update
sudo cp self-signed.conf /etc/nginx/snippets/self-signed.conf
sudo cp ssl-params.conf /etc/nginx/snippets/ssl-params.conf
sudo apt-get install -y openssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt --config openssl.cnf
sudo rm -f /etc/nginx/dhparam.pem
sudo openssl dhparam -out /etc/nginx/dhparam.pem 1024
