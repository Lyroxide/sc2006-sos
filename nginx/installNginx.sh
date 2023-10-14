#!/bin/bash
service_name="apache2.service"

# Check if the service exists
if systemctl --all --type service | grep -q "$service_name"; then
    echo "$service_name exists."

    # Check if the service is running
    if systemctl is-active --quiet $service_name; then
        echo "$service_name is running."

        # Stop and disable the service
        sudo systemctl stop $service_name
        sudo systemctl disable $service_name

        echo "$service_name has been stopped and disabled."
    else
        echo "$service_name is not running."
    fi
else
    echo "$service_name does NOT exist."
fi

sudo apt update
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common nginx



