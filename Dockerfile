FROM ubuntu:latest
LABEL authors="smblackwll"

FROM node:lts-alpine


ENTRYPOINT ["top", "-b"]