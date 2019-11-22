# run 
npm start

## curl

> [useage](https://gist.github.com/subfuzion/08c5d85437d5d4f00e58)

```bash

curl -d '{"username":"paul", "password":"123456"}' -H "Content-Type: application/json" -X POST http://localhost:8080/signup | jq .




```

## todos

- gridFS / cloud storage

## Docker

- add Dockerfile

```Dockerfile
FROM node:10 
# pull a node image from docker hub

WORKDIR /usr/src/api
#set the working dir to any dir

COPY package.json ./
# copy package.json to the container

RUN npm install 
# install package.json modules in container

COPY . . 
# copy everything to container /app

EXPOSE 4000

# expose port 3000 to mount it to another port in local machine 

# RUN npm install -g nodemon // install nodemon for changes on the fly

CMD [ "npm", "run", "dev" ] 
# start server inside container


```

- add .dockerignore file

```sh
touch .dockerignore

node_modules
npm-debug.log

```

- Build docker image

```sh

# -t tag
# Usage:  docker build [OPTIONS] PATH | URL | -
docker build -t paul.xiao/node-app . 

# build logs
Sending build context to Docker daemon  753.7kB
Step 1/7 : FROM node:10
 ---> 5a401340b79f
 ....
 ....
 ....
 ---> Running in c213e2ec62d4
Removing intermediate container c213e2ec62d4
 ---> 0fa6b3d8f3c7
Successfully built 0fa6b3d8f3c7
Successfully tagged paulxiao/node-app:latest

# check image

docker images

```

- Run docker image

```sh
# -p Publish a container's port(s) to the host
# -d  Run container in background and print container ID

docker run -p 49160:8080 -d paulxiao/node-app

# result
$ docker run -p 49160:8080 -d paulxiao/node-app
97f65ba0ae0f7d0eb13788503c99a73497ba04ea0e7a72dc69ac475aa6380889

# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080 in docker image

# test

curl -i localhost:49160

```
- Bash on docker

```sh

# Enter the container
$ docker exec -it <container id> /bin/bash

```
- Run mutiple images 

[Docker Compose V3 Docs](https://docs.docker.com/compose/compose-file/#volumes)


