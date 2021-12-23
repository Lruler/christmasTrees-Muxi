FROM node:14.17.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app/server

#Build server file
RUN yarn config set registry https://registry.npm.taobao.org/ #换源
RUN yarn install 

# Bundle app source
EXPOSE 3000
CMD [ "npm", "start" ]