# syntax=docker/dockerfile:1
# check=error=true
# Image of an Angular application served as static files. Copy as Dockerfile next to nginx.conf,
# replace "web" with the project name of angular.json, and set the versions of the project.

ARG NODE_VERSION=24
ARG NGINX_VERSION=1.29

FROM docker.io/library/node:${NODE_VERSION} AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM docker.io/nginx/nginx-unprivileged:${NGINX_VERSION} AS final
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/web/browser /usr/share/nginx/html
# The unprivileged user of the NGINX image (UID 101).
USER 101
EXPOSE 8080
