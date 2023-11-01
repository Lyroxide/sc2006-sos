FROM mysql:8.0-debian

#ENV MYSQL_ROOT_PASSWORD 123456789
ADD letsmakantogether_mysql.sql /docker-entrypoint-initdb.d
RUN chmod a+r docker-entrypoint-initdb.d/letsmakantogether_mysql.sql
RUN apt update && apt upgrade -y && apt install -y vim

EXPOSE 3306
