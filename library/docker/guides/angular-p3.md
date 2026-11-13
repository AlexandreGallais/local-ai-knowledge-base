---
title: "Angular language-specific guide (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/angular.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Angular language-specific guide (part 3 of 3)

## Use containers for Angular development

### Prerequisites

Complete Containerize Angular application.

---

### Overview

In this section, you'll learn how to set up both production and development environments for your containerized Angular application using Docker Compose. This setup allows you to serve a static production build via Nginx and to develop efficiently inside containers using a live-reloading dev server with Compose Watch.

You’ll learn how to:

- Configure separate containers for production and development
- Enable automatic file syncing using Compose Watch in development
- Debug and live-preview your changes in real-time without manual rebuilds

---

### Automatically update services (development mode)

Use Compose Watch to automatically sync source file changes into your containerized development environment. This provides a seamless, efficient development experience without restarting or rebuilding containers manually.

### Step 1: Create a development Dockerfile

Create a file named `Dockerfile.dev` in your project root with the following content:

```dockerfile
# =========================================
# Stage 1: Development - Angular Application
# =========================================

# Define the Node.js version to use (Alpine for a small footprint)
ARG NODE_VERSION=24.12.0-alpine

# Set the base image for development
FROM node:${NODE_VERSION} AS dev

# Set environment variable to indicate development mode
ENV NODE_ENV=development

# Set the working directory inside the container
WORKDIR /app

# Copy only the dependency files first to optimize Docker caching
COPY package.json package-lock.json* ./

# Install dependencies using npm with caching to speed up subsequent builds
RUN --mount=type=cache,target=/root/.npm npm install

# Copy all application source files into the container
COPY . .

# Expose the port Angular uses for the dev server (default is 4200)
EXPOSE 4200

# Start the Angular dev server and bind it to all network interfaces
CMD ["npm", "start", "--", "--host=0.0.0.0"]

```

This file sets up a lightweight development environment for your Angular application using the dev server.

#### Step 2: Update your `compose.yaml` file

Open your `compose.yaml` file and define two services: one for production (`angular-prod`) and one for development (`angular-dev`).

Here’s an example configuration for an Angular application:

```yaml
services:
  angular-prod:
    build:
      context: .
      dockerfile: Dockerfile
    image: docker-angular-sample
    ports:
      - "8080:8080"

  angular-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "4200:4200"
    develop:
      watch:
        - action: sync
          path: .
          target: /app
```

- The `angular-prod` service builds and serves your static production app using Nginx.
- The `angular-dev` service runs your Angular development server with live reload and hot module replacement.
- `watch` triggers file sync with Compose Watch.

> **Note:**
> For more details, see the official guide: Use Compose Watch.

After completing the previous steps, your project directory should now contain the following files:

```text
├── docker-angular-sample/
│ ├── Dockerfile
│ ├── Dockerfile.dev
│ ├── .dockerignore
│ ├── compose.yaml
│ └── nginx.conf
```

#### Step 4: Start Compose Watch

Run the following command from the project root to start the container in watch mode

```console
$ docker compose watch angular-dev
```

#### Step 5: Test Compose Watch with Angular

To verify that Compose Watch is working correctly:

1. Open the `src/app/app.component.html` file in your text editor.

2. Locate the following line:

   ```html
   <h1>Docker Angular Sample Application</h1>
   ```

3. Change it to:

   ```html
   <h1>Hello from Docker Compose Watch</h1>
   ```

4. Save the file.

5. Open your browser at http://localhost:4200.

You should see the updated text appear instantly, without needing to rebuild the container manually. This confirms that file watching and automatic synchronization are working as expected.

---

## Run Angular tests in a container

### Prerequisites

Complete all the previous sections of this guide, starting with Containerize Angular application.

### Overview

Testing is a critical part of the development process. In this section, you'll learn how to:

- Run Jasmine unit tests using the Angular CLI inside a Docker container.
- Use Docker Compose to isolate your test environment.
- Ensure consistency between local and container-based testing.

The `docker-angular-sample` project comes pre-configured with Jasmine, so you can get started quickly without extra setup.

---

### Run tests during development

The `docker-angular-sample` application includes a sample test file at the following location:

```console
$ src/app/app.component.spec.ts
```

This test uses Jasmine to validate the AppComponent logic.

#### Step 1: Update compose.yaml

Add a new service named `angular-test` to your `compose.yaml` file. This service allows you to run your test suite in an isolated, containerized environment.

```yaml
services:
  angular-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    develop:
      watch:
        - action: sync
          path: .
          target: /app

  angular-prod:
    build:
      context: .
      dockerfile: Dockerfile
    image: docker-angular-sample
    ports:
      - "8080:8080"

  angular-test:
    build:
      context: .
      dockerfile: Dockerfile.dev
    command: ["npm", "run", "test"]
```

The angular-test service reuses the same `Dockerfile.dev` used for development and overrides the default command to run tests with `npm run test`. This setup ensures a consistent test environment that matches your local development configuration.

After completing the previous steps, your project directory should contain the following files:

```text
├── docker-angular-sample/
│ ├── Dockerfile
│ ├── Dockerfile.dev
│ ├── .dockerignore
│ ├── compose.yaml
│ └── nginx.conf
```

#### Step 2: Run the tests

To execute your test suite inside the container, run the following command from your project root:

```console
$ docker compose run --rm angular-test
```

This command will:

- Start the `angular-test` service defined in your `compose.yaml` file.
- Execute the `npm run test` script using the same environment as development.
- Automatically removes the container after tests complete, using the `docker compose run --rm` command.

You should see output similar to the following:

```shell
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.529 s
```

> **Note:**
> For more information about Compose commands, see the Compose CLI
> reference.

---

### Summary

In this section, you learned how to run unit tests for your Angular application inside a Docker container using Jasmine and Docker Compose.

What you accomplished:

- Created a `angular-test` service in `compose.yaml` to isolate test execution.
- Reused the development `Dockerfile.dev` to ensure consistency between dev and test environments.
- Ran tests inside the container using `docker compose run --rm angular-test`.
- Ensured reliable, repeatable testing across environments without depending on your local machine setup.

---

### Related resources

Explore official references and best practices to sharpen your Docker testing workflow:

- Dockerfile reference – Understand all Dockerfile instructions and syntax.
- Best practices for writing Dockerfiles – Write efficient, maintainable, and secure Dockerfiles.
- Compose file reference – Learn the full syntax and options available for configuring services in `compose.yaml`.
- `docker compose run` CLI reference – Run one-off commands in a service container.
