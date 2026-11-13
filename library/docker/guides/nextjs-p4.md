---
title: "Containerize a Next.js application (part 4 of 6)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/nextjs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Containerize a Next.js application (part 4 of 6)

```dockerfile
   # ============================================
   # Stage 1: Dependencies Installation Stage
   # ============================================

   # IMPORTANT: Docker Hardened Image (DHI) Version Maintenance
   # This Dockerfile uses dhi.io/node and dhi.io/nginx. Regularly validate and update to the latest DHI versions in the catalog for security and compatibility.

   FROM dhi.io/node:24-alpine3.22-dev AS dependencies

   # Set the working directory
   WORKDIR /app

   # Copy package-related files first to leverage Docker's caching mechanism
   COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

   # Install project dependencies with frozen lockfile for reproducible builds
   RUN --mount=type=cache,target=/root/.npm \
       --mount=type=cache,target=/usr/local/share/.cache/yarn \
       --mount=type=cache,target=/root/.local/share/pnpm/store \
     if [ -f package-lock.json ]; then \
       npm ci --no-audit --no-fund; \
     elif [ -f yarn.lock ]; then \
       corepack enable yarn && yarn install --frozen-lockfile --production=false; \
     elif [ -f pnpm-lock.yaml ]; then \
       corepack enable pnpm && pnpm install --frozen-lockfile; \
     else \
       echo "No lockfile found." && exit 1; \
     fi

   # ============================================
   # Stage 2: Build Next.js Application
   # ============================================

   FROM dhi.io/node:24-alpine3.22-dev AS builder

   # Set the working directory
   WORKDIR /app

   # Copy project dependencies from dependencies stage
   COPY --from=dependencies /app/node_modules ./node_modules

   # Copy application source code
   COPY . .

   ENV NODE_ENV=production

   # Next.js collects completely anonymous telemetry data about general usage.
   # Learn more here: https://nextjs.org/telemetry
   # Uncomment the following line in case you want to disable telemetry during the build.
   # ENV NEXT_TELEMETRY_DISABLED=1

   # Build Next.js application
   RUN --mount=type=cache,target=/app/.next/cache \
     if [ -f package-lock.json ]; then \
       npm run build; \
     elif [ -f yarn.lock ]; then \
       corepack enable yarn && yarn build; \
     elif [ -f pnpm-lock.yaml ]; then \
       corepack enable pnpm && pnpm build; \
     else \
       echo "No lockfile found." && exit 1; \
     fi

   # =========================================
   # Stage 3: Serve Static Files with Nginx
   # =========================================

   FROM dhi.io/nginx:1.28.0-alpine3.21-dev AS runner

   # Set the working directory
   WORKDIR /app

   # Next.js collects completely anonymous telemetry data about general usage.
   # Learn more here: https://nextjs.org/telemetry
   # Uncomment the following line in case you want to disable telemetry during the run time.
   # ENV NEXT_TELEMETRY_DISABLED=1

   # Copy custom Nginx config
   COPY nginx.conf /etc/nginx/nginx.conf

   # Copy the static build output from the build stage to Nginx's default HTML serving directory
   COPY --chown=nginx:nginx --from=builder /app/out /usr/share/nginx/html

   # Non-root user for security best practices
   USER nginx

   # Expose port 8080 to allow HTTP traffic
   EXPOSE 8080

   # Start Nginx directly with custom config
   ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
   CMD ["-g", "daemon off;"]
   ```

**Using the Docker Official Image**

Create a file named `Dockerfile` with the following contents (uses `node` and `nginxinc/nginx-unprivileged`):

```dockerfile
# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================

ARG NODE_VERSION=24.14.0-slim
ARG NGINXINC_IMAGE_TAG=alpine3.22

FROM node:${NODE_VERSION} AS dependencies

# Set the working directory
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
  if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn install --frozen-lockfile --production=false; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm install --frozen-lockfile; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# ============================================
# Stage 2: Build Next.js Application
# ============================================

FROM node:${NODE_VERSION} AS builder

# Set the working directory
WORKDIR /app

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application source code
COPY . .

ENV NODE_ENV=production

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js application
RUN --mount=type=cache,target=/app/.next/cache \
  if [ -f package-lock.json ]; then \
    npm run build; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn build; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm build; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# =========================================
# Stage 3: Serve Static Files with Nginx
# =========================================

FROM nginxinc/nginx-unprivileged:${NGINXINC_IMAGE_TAG} AS runner

# Set the working directory
WORKDIR /app

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the run time.
# ENV NEXT_TELEMETRY_DISABLED=1

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --from=builder /app/out /usr/share/nginx/html

# Non-root user for security best practices
USER nginx

# Expose port 8080 to allow HTTP traffic
EXPOSE 8080

# Start Nginx directly with custom config
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]
```

> **Note:**
> This guide uses nginx-unprivileged instead of the standard Nginx image to run as a non-root user, following security best practices.

1. Create `nginx.conf` (required for export output only) — Create a file named `nginx.conf` in the root of your project:

   ```nginx
   # Minimal Nginx config for static Next.js app
   worker_processes 1;

   # Store PID in /tmp (always writable)
   pid /tmp/nginx.pid;

   events {
       worker_connections 1024;
   }

   http {
       include       /etc/nginx/mime.types;
       default_type  application/octet-stream;

       # Disable logging to avoid permission issues
       access_log off;
       error_log  /dev/stderr;

       # Optimize static file serving
       sendfile        on;
       tcp_nopush      on;
       tcp_nodelay     on;
       keepalive_timeout  65;

       # Gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
       gzip_min_length 256;

       server {
           listen       8080;
           server_name  localhost;

           # Serve static files
           root /usr/share/nginx/html;
           index index.html;

           # Handle Next.js static export routing
           # See: https://nextjs.org/docs/app/guides/static-exports#deploying
           location / {
               try_files $uri $uri.html $uri/ =404;
           }

           # This is necessary when `trailingSlash: false` (default).
           # You can omit this when `trailingSlash: true` in next.config.
           # Handles nested routes like /blog/post -> /blog/post.html
           location ~ ^/(.+)/$ {
               rewrite ^/(.+)/$ /$1.html break;
           }

           # Serve Next.js static assets
           location ~ ^/_next/ {
               try_files $uri =404;
               expires 1y;
               add_header Cache-Control "public, immutable";
           }

           # Optional 404 handling
           error_page 404 /404.html;
           location = /404.html {
               internal;
           }
       }
   }
   ```

   > **Note:**
   > Export uses port 8080. For more details, see the Next.js output configuration and Nginx documentation.

#### Step 2: Create the compose.yaml file

Create a file named `compose.yaml` with the following contents:

```yaml
services:
  server:
    build:
      context: .
    ports:
      - 3000:3000
```

> **Note:**
> If using export output (Nginx), change the port mapping to `8080:8080`.

#### Step 3: Create the .dockerignore file

The `.dockerignore` file tells Docker which files and folders to exclude when building the image.

> **Note:**
> This helps:
>
> - Reduce image size
> - Speed up the build process
> - Prevent sensitive or unnecessary files (like `.env`, `.git`, or `node_modules`) from being added to the final image.
>
> To learn more, visit the .dockerignore reference.

Create a file named `.dockerignore` with the following contents:

```dockerignore
# Dependencies (installed inside the image, never copy from host)
node_modules/
.pnp/
.pnp.js
.pnpm-store/

# Next.js build output (generated during the image build)
.next/
out/
dist/
build/
.vercel/

# Testing (not needed in the production image)
coverage/
.nyc_output/
__tests__/
__mocks__/
jest/
cypress/
playwright-report/
test-results/
.vitest/

# Environment files (avoid leaking secrets into the build context)
.env
.env*
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug and log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
*.log

# IDE and editor files
.vscode/
.idea/
.cursor/
.cursorrules
.copilot/
*.swp
*.swo
*~

# Git
.git/
.gitignore
.gitattributes

# Docker files (reduce build context; not needed inside the image)
Dockerfile*
.dockerignore
docker-compose*.yml
compose*.yaml

# Documentation (not needed in the image)
*.md
docs/

# CI/CD (not needed in the image)
.github/
.gitlab-ci.yml
.travis.yml
.circleci/
Jenkinsfile

# TypeScript and build metadata
*.tsbuildinfo

# Cache and temporary directories
.cache/
.parcel-cache/
.eslintcache
.stylelintcache
.turbo/
.tmp/
.temp/

# Sensitive or dev-only config (optional; omit if your build needs these)
.pem
.editorconfig
.prettierrc*
.eslintrc*
.stylelintrc*
.babelrc*
*.iml

# OS-specific files
.DS_Store
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
Desktop.ini
```

#### Step 4: Build the Next.js application image

With your custom configuration in place, you're now ready to build the Docker image. Use the Dockerfile you created in Step 1 (standalone or export).

The setup includes:

- Multi-stage builds for optimized image size
- Standalone: Node.js server on port 3000; Export: Nginx serving static files on port 8080
- Non-root user for enhanced security
- Proper file permissions and ownership

After completing the previous steps, your project directory should contain at least the following files (export also requires `nginx.conf`):

```text
├── docker-nextjs-sample/
│ ├── Dockerfile
│ ├── .dockerignore
│ ├── compose.yaml
│ └── next.config.ts
```

Now that your Dockerfile is configured, you can build the Docker image for your Next.js application.

> **Note:**
> The `docker build` command packages your application into an image using the instructions in the Dockerfile. It includes all necessary files from the current directory (called the build context).

Run the following command from the root of your project:

```console
$ docker build --tag nextjs-sample .
```

What this command does:

- Uses the Dockerfile in the current directory (.)
- Packages the application and its dependencies into a Docker image
- Tags the image as nextjs-sample so you can reference it later

#### Step 5: View local images

After building your Docker image, you can check which images are available on your local machine using either the Docker CLI or Docker Desktop. Since you're already working in the terminal, let's use the Docker CLI.

To list all locally available Docker images, run the following command:

```console
$ docker images
```

Example Output:

```shell
REPOSITORY                TAG               IMAGE ID       CREATED         SIZE
nextjs-sample             latest            8c5fc80f098e   14 seconds ago   130MB
```

This output provides key <example-value> about your images:

- Repository – The name assigned to the image.
- Tag – A version label that helps identify different builds (e.g., latest).
- Image ID – A unique identifier for the image.
- Created – The timestamp indicating when the image was built.
- Size – The total disk space used by the image.

If the build was successful, you should see `nextjs-sample` image listed.

---
