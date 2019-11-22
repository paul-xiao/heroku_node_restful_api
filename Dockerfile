FROM node:10 
# pull a node image from docker hub

WORKDIR /usr/src/api
#set the working dir to /app

COPY package.json ./
# copy package.json to the container

RUN npm install 
# install package.json modules in container

COPY . . 
# copy everything to container /app

EXPOSE 8080

# expose port 3000 to mount it to another port in local machine 

# RUN npm install -g nodemon // install nodemon for changes on the fly

CMD [ "npm", "run", "dev" ] 
# start server inside container