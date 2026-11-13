---
title: ".NET language-specific guide (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/dotnet.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

The .NET getting started guide teaches you how to create a containerized .NET application using Docker. In this guide, you'll learn how to:

- Containerize and run a .NET application
- Set up a local environment to develop a .NET application using containers
- Run tests for a .NET application using containers

After completing the .NET getting started modules, you should be able to containerize your own .NET application based on the examples and instructions provided in this guide.

Start by containerizing an existing .NET application.

## Containerize a .NET application

### Prerequisites

- You have installed the latest version of Docker
  Desktop.
- You have a git client. The examples in this
  section use a command-line based git client, but you can use any client.

### Overview

This section walks you through containerizing and running a .NET
application.

### Get the sample applications

In this guide, you will use a pre-built .NET application. The application is
similar to the application built in the Docker Blog article, Building a
Multi-Container .NET App Using Docker
Desktop.

Open a terminal, change directory to a directory that you want to work in, and
run the following command to clone the repository.

```console
$ git clone https://github.com/docker/docker-dotnet-sample
```

### Create Docker assets

Now that you have an application, you can create the necessary Docker assets to containerize it. You can choose between using the official .NET images or Docker Hardened Images (DHI).

> **Tip:**
>
> Gordon, Docker's AI assistant, can generate Docker assets for your project. Ask Gordon to create a Dockerfile, Compose file, and `.dockerignore` tailored to your application.

> Docker Hardened Images (DHIs) are minimal, secure, and production-ready container base and application images maintained by Docker. DHI images are recommended for better security—they are designed to reduce vulnerabilities and simplify compliance.

**Using Docker Hardened Images**

Docker Hardened Images (DHIs) for .NET are available in the Docker Hardened Images catalog. Docker Hardened Images are freely available to everyone with no subscription required. You can pull and use them like any other Docker image after signing in to the DHI registry. For more information, see the DHI quickstart guide.

1. Sign in to the DHI registry:

   ```console
   $ docker login dhi.io
   ```

2. Pull the .NET SDK DHI (check the catalog for available versions):

   ```console
   $ docker pull dhi.io/dotnet:10-sdk
   ```

3. Pull the ASP.NET Core runtime DHI (check the catalog for available versions):
   ```console
   $ docker pull dhi.io/aspnetcore:10
   ```

Create the following files in your `docker-dotnet-sample` directory.

```dockerfile
# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM dhi.io/dotnet:10-sdk AS build
ARG TARGETARCH
COPY . /source
WORKDIR /source/src
RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet publish -a ${TARGETARCH/amd64/x64} --use-current-runtime --self-contained false -o /app

FROM dhi.io/aspnetcore:10 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "myWebApp.dll"]
```

> **Note:**
>
> DHI runtime images already run as a non-root user (`nonroot`, UID 65532), so there's no need to create a user or specify `USER` in your Dockerfile. This reduces the attack surface and simplifies your configuration.

```yaml
# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Docker Compose reference guide at
# https://docs.docker.com/go/compose-spec-reference/

# Here the instructions define your application as a service called "server".
# This service is built from the Dockerfile in the current directory.
# You can add other services your application may depend on here, such as a
# database or a cache. For examples, see the Awesome Compose repository:
# https://github.com/docker/awesome-compose
services:
  server:
    build:
      context: .
      target: final
    ports:
      - 8080:8080

# The commented out section below is an example of how to define a PostgreSQL
# database that your application can use. `depends_on` tells Docker Compose to
# start the database before your application. The `db-data` volume persists the
# database data between container restarts. The `db-password` secret is used
# to set the database password. You must create `db/password.txt` and add
# a password of your choosing to it before running `docker compose up`.
#     depends_on:
#       db:
#         condition: service_healthy
#   db:
#     image: postgres
#     restart: always
#     user: postgres
#     secrets:
#       - db-password
#     volumes:
#       - db-data:/var/lib/postgresql/data
#     environment:
#       - POSTGRES_DB=example
#       - POSTGRES_PASSWORD_FILE=/run/secrets/db-password
#     expose:
#       - 5432
#     healthcheck:
#       test: [ "CMD", "pg_isready" ]
#       interval: 10s
#       timeout: 5s
#       retries: 5
# volumes:
#   db-data:
# secrets:
#   db-password:
#     file: db/password.txt
```

```text
# Include any files or directories that you don't want to be copied to your
# container here (e.g., local build artifacts, temporary files, etc.).
#
# For more help, visit the .dockerignore file reference guide at
# https://docs.docker.com/go/build-context-dockerignore/

**/.classpath
**/.dockerignore
**/.env
**/.git
**/.gitignore
**/.project
**/.settings
**/.toolstarget
**/.vs
**/.vscode
**/*.*proj.user
**/*.dbmdl
**/*.jfm
**/bin
**/charts
**/docker-compose*
**/compose.y*ml
**/Dockerfile*
**/node_modules
**/npm-debug.log
**/obj
**/secrets.dev.yaml
**/values.dev.yaml
LICENSE
README.md
```

**Using the official .NET 10 image**

Create the following files in your `docker-dotnet-sample` directory.

```dockerfile
# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
ARG TARGETARCH
COPY . /source
WORKDIR /source/src
RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet publish -a ${TARGETARCH/amd64/x64} --use-current-runtime --self-contained false -o /app

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app
COPY --from=build /app .
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser
ENTRYPOINT ["dotnet", "myWebApp.dll"]
```

```yaml
# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Docker Compose reference guide at
# https://docs.docker.com/go/compose-spec-reference/

# Here the instructions define your application as a service called "server".
# This service is built from the Dockerfile in the current directory.
# You can add other services your application may depend on here, such as a
# database or a cache. For examples, see the Awesome Compose repository:
# https://github.com/docker/awesome-compose
services:
  server:
    build:
      context: .
      target: final
    ports:
      - 8080:8080

# The commented out section below is an example of how to define a PostgreSQL
# database that your application can use. `depends_on` tells Docker Compose to
# start the database before your application. The `db-data` volume persists the
# database data between container restarts. The `db-password` secret is used
# to set the database password. You must create `db/password.txt` and add
# a password of your choosing to it before running `docker compose up`.
#     depends_on:
#       db:
#         condition: service_healthy
#   db:
#     image: postgres
#     restart: always
#     user: postgres
#     secrets:
#       - db-password
#     volumes:
#       - db-data:/var/lib/postgresql/data
#     environment:
#       - POSTGRES_DB=example
#       - POSTGRES_PASSWORD_FILE=/run/secrets/db-password
#     expose:
#       - 5432
#     healthcheck:
#       test: [ "CMD", "pg_isready" ]
#       interval: 10s
#       timeout: 5s
#       retries: 5
# volumes:
#   db-data:
# secrets:
#   db-password:
#     file: db/password.txt
```

```text
# Include any files or directories that you don't want to be copied to your
# container here (e.g., local build artifacts, temporary files, etc.).
#
# For more help, visit the .dockerignore file reference guide at
# https://docs.docker.com/go/build-context-dockerignore/

**/.classpath
**/.dockerignore
**/.env
**/.git
**/.gitignore
**/.project
**/.settings
**/.toolstarget
**/.vs
**/.vscode
**/*.*proj.user
**/*.dbmdl
**/*.jfm
**/bin
**/charts
**/docker-compose*
**/compose.y*ml
**/Dockerfile*
**/node_modules
**/npm-debug.log
**/obj
**/secrets.dev.yaml
**/values.dev.yaml
LICENSE
README.md
```

You should now have the following contents in your `docker-dotnet-sample`
directory.

```text
├── docker-dotnet-sample/
│ ├── .git/
│ ├── src/
│ ├── .dockerignore
│ ├── compose.yaml
│ ├── Dockerfile
│ └── README.md
```

To learn more about the files, see the following:

- Dockerfile
- .dockerignore
- compose.yaml

### Run the application

Inside the `docker-dotnet-sample` directory, run the following command in a
terminal.

```console
$ docker compose up --build
```

Open a browser and view the application at http://localhost:8080. You should see a simple web application.

In the terminal, press `ctrl`+`c` to stop the application.

#### Run the application in the background

You can run the application detached from the terminal by adding the `-d`
option. Inside the `docker-dotnet-sample` directory, run the following command
in a terminal.

```console
$ docker compose up --build -d
```

Open a browser and view the application at http://localhost:8080. You should see a simple web application.

In the terminal, run the following command to stop the application.

```console
$ docker compose down
```

For more information about Compose commands, see the Compose CLI
reference.
