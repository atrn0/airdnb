FROM node:15-alpine

WORKDIR /frontend

COPY package.json yarn.lock ./
RUN yarn

COPY . .

EXPOSE 3000
