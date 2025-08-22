FROM ubuntu:latest
LABEL authors="smblackwll"

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

COPY . .

RUN npx prisma generate




EXPOSE 3000

ENTRYPOINT ["top", "-b"]