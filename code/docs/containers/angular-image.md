---
id: containers-angular-image
title: Angular container image
topic: containers
summary: Build an Angular application in a container and serve its browser folder with an unprivileged NGINX on port 8080.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base from CC BY 4.0 and Apache 2.0 sources
variant: files
---

# Angular container image

Contents: 1. Build output · 2. Dockerfile · 3. Server · 4. Old patterns · Sources

## 1. Angular build output (ng build and dist)

- `ng build` writes to `dist/<app>/` and uses the production configuration by default. [S1]
- For a static server, copy the subfolder `dist/<app>/browser/`, not `dist/<app>/`. [S1]
- Every route the server does not know must return `index.html`. With static prerendering, the fallback file is `index.csr.html`. [S1]
- With server-side rendering, copy `browser/` and `server/`, then run `node dist/<app>/server/server.mjs`. [S1]

## 2. Angular Dockerfile (build stage and NGINX stage)

```dockerfile
# syntax=docker/dockerfile:1
# check=error=true
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
USER 101
EXPOSE 8080
```

- Replace `web` with the project name from `angular.json`.
- Take the Node.js version from the Angular version: Angular 22 needs Node.js 22.22, 24.15 or 26 (see `docs/typescript/nodejs.md`).
- Take the versions from the project; the values above are examples. The full template is `templates/containers/angular.Dockerfile`.

## 3. Unprivileged NGINX server (nginx.conf for an Angular app)

- The image `nginx/nginx-unprivileged` listens on 8080, has no `user` directive and writes its temporary files under `/tmp`. [S2]
- The old name `nginxinc/nginx-unprivileged` does not receive the recent versions. Use `nginx/nginx-unprivileged`. [S2]

```nginx
server {
  listen 8080;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

The `try_files` line returns `index.html` for every unknown route, as Angular routing needs. This server block is a common pattern; check it once by starting the image.

## 4. Old patterns (Angular images)

| Old | Now |
| --- | --- |
| `COPY --from=build /app/dist/<app> /usr/share/nginx/html` | Copy `dist/<app>/browser` |
| `FROM nginx` and `listen 80` | `nginx/nginx-unprivileged`, `listen 8080` |
| `nginxinc/nginx-unprivileged` | `nginx/nginx-unprivileged` |
| `ng build --prod` | `ng build` (production by default) |

## Sources

- [S1] Angular, "Deployment", v22, <https://angular.dev/tools/cli/deployment>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] NGINX, F5, "docker-nginx-unprivileged", README, <https://github.com/nginx/docker-nginx-unprivileged>, read 2026-11-12, Apache 2.0, summarized.
