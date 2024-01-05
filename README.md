# LetsMakanTogether

## Introduction

At Let'sMakanTogether, we believe that sharing a meal with friends is one of life's simple joys and it can be challenging to do so in today's fast-paced world. That's why we've created this platform that makes it easier than ever to connect with like-minded food enthusiasts and turn dining into a social experience.

## Directory Structure

- `vue`: This directory contains the Vue.js frontend of the application.
- `server`: This directory contains the Node.js backend of the application.
- `nginx`: This directory contains the configuration for the Nginx server that hosts the frontend.
- `database`: This directory contains the MySQL database scripts.
- `docker`: This directory contains the Docker configuration for the Vue + Nginx, Node, and MySQL services.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

For development and testing environments, you will need the following software installed on your system:

- [Node.js](https://nodejs.org/en/download/): Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Our project uses it for the backend server.
- [MySQL](https://dev.mysql.com/downloads/installer/): MySQL is a relational database management system. Our project uses it for data storage.
- [Nginx](https://nginx.org/en/download.html): Nginx is a web server which can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. Our project uses it for hosting the frontend.

For production environments, you will need:

- [Docker](https://docs.docker.com/get-docker/): Docker is a platform to develop, ship, and run applications inside containers. Our project uses it for containerizing the Vue + Nginx, Node, and MySQL services.

Instructions on how to install these software will be provided in the "Installing" section.

### Installing

**Step 1: Install Node.js**

- Visit the official Node.js website: https://nodejs.org/ and download the latest stable version for your Operating System (OS).

  ```sh
  node --version
  npm --version
  ```

**Step 2: Install MySQL**

- Go to the MySQL official website: https://dev.mysql.com/downloads/mysql/ and install MySQL for your OS.

- During installation, you'll be prompted to set the root password. Remember this, as you will need it to access the database.

**Step 3: Install Nginx**

- If you're on macOS, you can use homebrew to install Nginx:

  ```sh
  brew install nginx
  ```

- For Windows users, download Nginx from the official website: http://nginx.org/en/download.html

- For Linux (Ubuntu), you can use the package manager:

  ```sh
  sudo apt update
  sudo apt install nginx
  ```

- Confirm Nginx is installed by typing the following in your terminal or command line:

  ```sh
  nginx -v
  ```

- Start Nginx:

  ```sh
  # macOS/Linux
  sudo nginx

  # Windows, use the command prompt as Administrator
  start nginx
  ```

**Step 4: Clone Your Project Repository**

- Clone your project repository from the version control system into your desired workspace using:
  
  ```sh
  git clone https://github.com/Lyroxide/sc2006-sos.git
  ```

**Step 5: Development Environment Setup**

- Navigate to your project directory and install npm packages:

  ```sh
  cd vue
  npm install
  cd ../
  cd server
  npm install
  ```

- Set up your local configuration by editing `server/app/config/db.config.js`, ensuring your root password is set correctly. The local sql file can be found at `./database`.
  
- Run the project:

  ```sh
  cd server
  node server.js
  cd ../
  cd vue
  npm run dev
  ```


**Step 6: Access the Application**

- On your web browser, go to `http://localhost:8080`.


## Built With

- [Vue.js](https://vuejs.org/) - The web framework used
- [Node.js](https://nodejs.org/) - Backend server
- [Nginx](https://www.nginx.com/) - Server for hosting the frontend
- [MySQL](https://www.mysql.com/) - Database
- [Docker](https://www.docker.com/) - Containerization


## Authors

See the list of [authors](https://github.com/Lyroxide/sc2006-sos/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
