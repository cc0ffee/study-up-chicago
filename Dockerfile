FROM ubuntu:latest
LABEL authors="smblackwll"

FROM node:lts-alpine

run npm install



EXPOSE 3000

ENTRYPOINT ["top", "-b"]