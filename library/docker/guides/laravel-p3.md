---
title: "Develop and Deploy Laravel applications with Docker Compose (part 3 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/laravel.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Develop and Deploy Laravel applications with Docker Compose (part 3 of 5)

### Create a Docker Compose configuration for production

To bring all the services together, create a `compose.prod.yaml` file that defines the services, volumes, and networks for the production environment. Here's an example configuration:

```yaml
services:
  web:
    build:
      context: .
      dockerfile: ./docker/production/nginx/Dockerfile
    restart: unless-stopped # Automatically restart unless the service is explicitly stopped
    volumes:
      # Mount the 'laravel-storage' volume to '/var/www/storage' inside the container.
      # -----------------------------------------------------------
      # This volume stores persistent data like uploaded files and cache.
      # The ':ro' option mounts it as read-only in the 'web' service because Nginx only needs to read these files.
      # The 'php-fpm' service mounts the same volume without ':ro' to allow write operations.
      # -----------------------------------------------------------
      - laravel-storage-production:/var/www/storage:ro
    networks:
      - laravel-production
    ports:
      # Map port 80 inside the container to the port specified by 'NGINX_PORT' on the host machine.
      # -----------------------------------------------------------
      # This allows external access to the Nginx web server running inside the container.
      # For example, if 'NGINX_PORT' is set to '8080', accessing 'http://localhost:8080' will reach the application.
      # -----------------------------------------------------------
      - "${NGINX_PORT:-80}:80"
    depends_on:
      php-fpm:
        condition: service_healthy # Wait for php-fpm health check

  php-fpm:
    # For the php-fpm service, we will create a custom image to install the necessary PHP extensions and setup proper permissions.
    build:
      context: .
      dockerfile: ./docker/common/php-fpm/Dockerfile
      target: production # Use the 'production' stage in the Dockerfile
    restart: unless-stopped
    volumes:
      - laravel-storage-production:/var/www/storage # Mount the storage volume
    env_file:
      - .env
    networks:
      - laravel-production
    healthcheck:
      test: ["CMD-SHELL", "php-fpm-healthcheck || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 3
    # The 'depends_on' attribute with 'condition: service_healthy' ensures that
    # this service will not start until the 'postgres' service passes its health check.
    # This prevents the application from trying to connect to the database before it's ready.
    depends_on:
      postgres:
        condition: service_healthy

  # The 'php-cli' service provides a command-line interface for running Artisan commands and other CLI tasks.
  # -----------------------------------------------------------
  # This is useful for running migrations, seeders, or any custom scripts.
  # It shares the same codebase and environment as the 'php-fpm' service.
  # -----------------------------------------------------------
  php-cli:
    build:
      context: .
      dockerfile: ./docker/php-cli/Dockerfile
    tty: true # Enables an interactive terminal
    stdin_open: true # Keeps standard input open for 'docker exec'
    env_file:
      - .env
    networks:
      - laravel-production

  postgres:
    image: postgres:18
    restart: unless-stopped
    user: postgres
    ports:
      - "${POSTGRES_PORT}:5432"
    environment:
      - POSTGRES_DB=${POSTGRES_DATABASE}
      - POSTGRES_USER=${POSTGRES_USERNAME}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres-data-production:/var/lib/postgresql
    networks:
      - laravel-production
    # Health check for PostgreSQL
    # -----------------------------------------------------------
    # Health checks allow Docker to determine if a service is operational.
    # The 'pg_isready' command checks if PostgreSQL is ready to accept connections.
    # This prevents dependent services from starting before the database is ready.
    # -----------------------------------------------------------
    healthcheck:
      test: ["CMD", "pg_isready"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:alpine
    restart: unless-stopped # Automatically restart unless the service is explicitly stopped
    networks:
      - laravel-production
    # Health check for Redis
    # -----------------------------------------------------------
    # Checks if Redis is responding to the 'PING' command.
    # This ensures that the service is not only running but also operational.
    # -----------------------------------------------------------
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

networks:
  # Attach the service to the 'laravel-production' network.
  # -----------------------------------------------------------
  # This custom network allows all services within it to communicate using their service names as hostnames.
  # For example, 'php-fpm' can connect to 'postgres' by using 'postgres' as the hostname.
  # -----------------------------------------------------------
  laravel-production:

volumes:
  postgres-data-production:
  laravel-storage-production:
```

> **Note:**
> Ensure you have an `.env` file at the root of your Laravel project with the necessary configurations to match the Docker Compose setup.

### Running your production environment

To start the production environment, run:

```console
$ docker compose -f compose.prod.yaml up --build -d
```

This command will build and start all the services in detached mode, providing a scalable and production-ready setup for your Laravel application.

### Summary

By setting up a Docker Compose environment for Laravel in production, you ensure that your application is optimized for performance, scalable, and secure. This setup makes deployments consistent and easier to manage, reducing the likelihood of errors due to differences between environments.
