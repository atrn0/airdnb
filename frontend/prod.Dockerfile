FROM node:15-alpine as build-env

WORKDIR /frontend

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

FROM caddy:2-alpine

WORKDIR /workspace

COPY --from=build-env /frontend/build /var/www

COPY caddy/Caddyfile .

EXPOSE 3000
