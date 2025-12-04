# your node version
FROM node:20-alpine AS deps-prod 

WORKDIR /app

COPY ./package*.json .

RUN npm install

COPY ./app ./app

