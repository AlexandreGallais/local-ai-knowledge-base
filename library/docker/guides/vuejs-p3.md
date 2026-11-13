---
title: "Vue.js language-specific guide (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/vuejs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Vue.js language-specific guide (part 3 of 3)

## Use containers for Vue.js development

### Prerequisites

Complete Containerize Vue.js application.

---

### Overview

In this section, you'll set up both production and development environments for your Vue.js application using Docker Compose. This approach streamlines your workflow—delivering a lightweight, static site via Nginx in production, and providing a fast, live-reloading dev server with Compose Watch for efficient local development.

You’ll learn how to:

- Configure isolated environments: Set up separate containers optimized for production and development use cases.
- Live-reload in development: Use Compose Watch to automatically sync file changes, enabling real-time updates without manual intervention.
- Preview and debug with ease: Develop inside containers with a seamless preview and debug experience—no rebuilds required after every change.

---

### Automatically update services (development mode)

Leverage Compose Watch to enable real-time file synchronization between your local machine and the containerized Vue.js development environment. This powerful feature eliminates the need to manually rebuild or restart containers, providing a fast, seamless, and efficient development workflow.

With Compose Watch, your code updates are instantly reflected inside the container—perfect for rapid testing, debugging, and live previewing changes.

### Step 1: Create a development Dockerfile

Create a file named `Dockerfile.dev` in your project root with the following content:

```dockerfile
# =========================================
# Stage 1: Develop the Vue.js Application
# =========================================
ARG NODE_VERSION=24.12.0-alpine

# Use a lightweight Node.js image for development
FROM node:${NODE_VERSION} AS dev

# Set environment variable to indicate development mode
ENV NODE_ENV=development

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json* ./

# Install project dependencies
RUN --mount=type=cache,target=/root/.npm npm install

# Copy the rest of the application source code into the container
COPY . .

# Change ownership of the application directory to the node user
RUN chown -R node:node /app

# Switch to the node user
USER node

# Expose the port used by the Vite development server
EXPOSE 5173

# Use a default command, can be overridden in Docker compose.yml file
CMD [ "npm", "run", "dev", "--", "--host" ]

```

This file sets up a lightweight development environment for your Vue.js application using the dev server.

#### Step 2: Update your `compose.yaml` file

Open your `compose.yaml` file and define two services: one for production (`vuejs-prod`) and one for development (`vuejs-dev`).

Here’s an example configuration for an Vue.js application:

```yaml
services:
  vuejs-prod:
    build:
      context: .
      dockerfile: Dockerfile
    image: docker-vuejs-sample
    ports:
      - "8080:8080"

  vuejs-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    develop:
      watch:
        - path: ./src
          target: /app/src
          action: sync
        - path: ./package.json
          target: /app/package.json
          action: restart
        - path: ./vite.config.js
          target: /app/vite.config.js
          action: restart
```

- The `vuejs-prod` service builds and serves your static production app using Nginx.
- The `vuejs-dev` service runs your Vue.js development server with live reload and hot module replacement.
- `watch` triggers file sync with Compose Watch.

> **Note:**
> For more details, see the official guide: Use Compose Watch.

After completing the previous steps, your project directory should now contain the following files:

```text
├── docker-vuejs-sample/
│ ├── Dockerfile
│ ├── Dockerfile.dev
│ ├── .dockerignore
│ ├── compose.yaml
│ └── nginx.conf
```

#### Step 4: Start Compose Watch

Run the following command from the project root to start the container in watch mode

```console
$ docker compose watch vuejs-dev
```

#### Step 5: Test Compose Watch with Vue.js

To confirm that Compose Watch is functioning correctly:

1. Open the `src/App.vue` file in your text editor.

2. Locate the following line:

   ```html
   <HelloWorld msg="You did it!" />
   ```

3. Change it to:

   ```html
   <HelloWorld msg="Hello from Docker Compose Watch" />
   ```

4. Save the file.

5. Open your browser at http://localhost:5173.

You should see the updated text appear instantly, without needing to rebuild the container manually. This confirms that file watching and automatic synchronization are working as expected.

---

## Run vue.js tests in a container

### Prerequisites

Complete all the previous sections of this guide, starting with Containerize Vue.js application.

### Overview

Testing is a critical part of the development process. In this section, you'll learn how to:

- Run unit tests using Vitest inside a Docker container.
- Use Docker Compose to run tests in an isolated, reproducible environment.

You’ll use Vitest — a blazing fast test runner designed for Vite — together with @vue/test-utils to write unit tests that validate your component logic, props, events, and reactive behavior.

This setup ensures your Vue.js components are tested in an environment that mirrors how users actually interact with your application.

---

### Run tests during development

`docker-vuejs-sample` application includes a sample test file at location:

```console
$ src/components/__tests__/HelloWorld.spec.ts
```

This test uses Vitest and Vue Test Utils to verify the behavior of the HelloWorld component.

---

#### Step 1: Update compose.yaml

Add a new service named `vuejs-test` to your `compose.yaml` file. This service allows you to run your test suite in an isolated containerized environment.

```yaml
services:
  vuejs-prod:
    build:
      context: .
      dockerfile: Dockerfile
    image: docker-vuejs-sample
    ports:
      - "8080:8080"

  vuejs-dev:
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

  vuejs-test:
    build:
      context: .
      dockerfile: Dockerfile.dev
    command: ["npm", "run", "test:unit"]
```

The vuejs-test service reuses the same `Dockerfile.dev` used for development and overrides the default command to run tests with `npm run test`. This setup ensures a consistent test environment that matches your local development configuration.

After completing the previous steps, your project directory should contain the following files:

```text
├── docker-vuejs-sample/
│ ├── Dockerfile
│ ├── Dockerfile.dev
│ ├── .dockerignore
│ ├── compose.yaml
│ └── nginx.conf
```

#### Step 2: Run the tests

To execute your test suite inside the container, run the following command from your project root:

```console
$ docker compose run --rm vuejs-test
```

This command will:

- Start the `vuejs-test` service defined in your `compose.yaml` file.
- Execute the `npm run test` script using the same environment as development.
- Automatically remove the container after the tests complete `docker compose run --rm` command.

You should see output similar to the following:

```shell
Test Files: 1 passed (1)
Tests:      1 passed (1)
Start at:   16:50:55
Duration:   718ms
```

> **Note:**
> For more information about Compose commands, see the Compose CLI
> reference.

---

### Summary

In this section, you learned how to run unit tests for your Vue.js application inside a Docker container using Vitest and Docker Compose.

What you accomplished:

- Created a `vuejs-test` service in `compose.yaml` to isolate test execution.
- Reused the development `Dockerfile.dev` to ensure consistency between dev and test environments.
- Ran tests inside the container using `docker compose run --rm vuejs-test`.
- Ensured reliable, repeatable testing across environments without depending on your local machine setup.

---

### Related resources

Explore official references and best practices to sharpen your Docker testing workflow:

- Dockerfile reference – Understand all Dockerfile instructions and syntax.
- Best practices for writing Dockerfiles – Write efficient, maintainable, and secure Dockerfiles.
- Compose file reference – Learn the full syntax and options available for configuring services in `compose.yaml`.
- `docker compose run` CLI reference – Run one-off commands in a service container.
