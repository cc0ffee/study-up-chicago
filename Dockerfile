FROM ubuntu:latest
LABEL authors="smblackwll"

FROM node:lts-alpine

RUN npm install

RUN npx prisma generate

EXPOSE 3000

ENTRYPOINT ["top", "-b"]