# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

COPY ./src ./src
COPY ./build ./build
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./nodemon.json ./nodemon.json

RUN yarn install

EXPOSE 4000

CMD ["yarn", "start:dev"]


