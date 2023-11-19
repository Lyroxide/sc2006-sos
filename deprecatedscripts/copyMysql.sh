#!/bin/bash


# Copy All the Relevant Database File
rm -rf ./docker/mysql/letsmakantogether_mysql.sql
cp -rf ./database/* ./docker/mysql/
