# Introduction

This is a backend for tronet system.

Happy coding!

# Start application

- ### First:

copy .env, docker-compose.yml, dockerfile:

```bash
cp .env.example .env && cp docker-compose.dev docker-compose.yml && cp Dockerfile.dev Dockerfile
```

build container:

```bash
docker-compose build
```

- ### If this is the first time you install this app, please follow these steps:

create network:

```bash
docker network create tronet
```

install package:

```bash
docker-compose run backend yarn
```

bash into mariadb container:

```bash
docker exec -it tronet_be-mariadb-1 bash
```

access mysql:

```bash
mysql -u root -p => password: 123qwe
```

create database name "tronet":

```bash
 create database tronet;
```

migrate database:

```bash
docker-compose run backend yarn migrate:run
```

- ### Finally (next time you start app, you only need to run this command):

```bash
docker-compose updocker
```
