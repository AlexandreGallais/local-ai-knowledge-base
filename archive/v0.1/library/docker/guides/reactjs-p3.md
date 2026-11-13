---
title: "React.js language-specific guide (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/reactjs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# React.js language-specific guide (part 3 of 3)

## Use containers for React.js development

### Prerequisites

Complete Containerize React.js application.

---

### Overview

In this section, you'll learn how to set up both production and development environments for your containerized React.js application using Docker Compose. This setup allows you to serve a static production build via Nginx and to develop efficiently inside containers using a live-reloading dev server with Compose Watch.

You’ll learn how to:

- Configure separate containers for production and development
- Enable automatic file syncing using Compose Watch in development
- Debug and live-preview your changes in real-time without manual rebuilds

---

### Automatically update services (development mode)

Use Compose Watch to automatically sync source file changes into your containerized development environment. This provides a seamless, efficient development experience without needing to restart or rebuild containers manually.

### Step 1: Create a development Dockerfile

Create a file named `Dockerfile.dev` in your project root with the following content:

```dockerfile
# =========================================
# Stage 1: Develop the React.js Application
# =========================================
ARG NODE_VERSION=24.12.0-alpine

# Use a lightweight Node.js image for development
FROM node:${NODE_VERSION} AS dev

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json* ./

# Install project dependencies
RUN --mount=type=cache,target=/root/.npm npm install

# Copy the rest of the application source code into the container
COPY . .

# Expose the port used by the Vite development server
EXPOSE 5173

# Use a default command, can be overridden in Docker compose.yml file
CMD ["npm", "run", "dev"]
```

This file sets up a lightweight development environment for your React app using the dev server.

#### Step 2: Update your `compose.yaml` file

Open your `compose.yaml` file and define two services: one for production (`react-prod`) and one for development (`react-dev`).

Here’s an example configuration for a React.js application:

```yaml
services:
  react-prod:
    build:
      context: .
      dockerfile: Dockerfile
    image: docker-reactjs-sample
    ports:
      - "8080:8080"

  react-dev:
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
```

- The `react-prod` service builds and serves your static production app using Nginx.
- The `react-dev` service runs your React development server with live reload and hot module replacement.
- `watch` triggers file sync with Compose Watch.

> **Note:**
> For more details, see the official guide: Use Compose Watch.

#### Step 3: Update vite.config.ts to ensure it works properly inside Docker

To make Vite’s development server work reliably inside Docker, you need to update your vite.config.ts with the correct settings.

Open the `vite.config.ts` file in your project root and update it as follows:

```ts
/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
});
```

> **Note:**
> The `server` options in `vite.config.ts` are essential for running Vite inside Docker:
>
> - `host: true` allows the dev server to be accessible from outside the container.
> - `port: 5173` sets a consistent development port (must match the one exposed in Docker).
> - `strictPort: true` ensures Vite fails clearly if the port is unavailable, rather than switching silently.
>
> For full details, refer to the Vite server configuration docs.

After completing the previous steps, your project directory should now contain the following files:

```text
├── docker-reactjs-sample/
│ ├── Dockerfile
│ ├── Dockerfile.dev
│ ├── .dockerignore
│ ├── compose.yaml
│ └── nginx.conf
```

#### Step 4: Start Compose Watch

Run the following command from your project root to start your container in watch mode:

```console
$ docker compose watch react-dev
```

#### Step 5: Test Compose Watch with React

To verify that Compose Watch is working correctly:

1. Open the `src/App.tsx` file in your text editor.

2. Locate the following line:

   ```html
   <h1>Vite + React</h1>
   ```

3. Change it to:

   ```html
   <h1>Hello from Docker Compose Watch</h1>
   ```

4. Save the file.

5. Open your browser at http://localhost:5173.

You should see the updated text appear instantly, without needing to rebuild the container manually. This confirms that file watching and automatic synchronization are working as expected.

---

## Run React.js tests in a container

### Prerequisites

Complete all the previous sections of this guide, starting with Containerize React.js application.

### Overview

Testing is a critical part of the development process. In this section, you'll learn how to:

- Run unit tests using Vitest inside a Docker container.
- Use Docker Compose to run tests in an isolated, reproducible environment.

You’ll use Vitest — a blazing fast test runner designed for Vite — along with Testing Library for assertions.

---

### Run tests during development

`docker-reactjs-sample` application includes a sample test file at location:

```console
$ src/App.test.tsx
```

This file uses Vitest and React Testing Library to verify the behavior of `App` component.

#### Step 1: Install Vitest and React Testing Library

If you haven’t already added the necessary testing tools, install them by running:

```console
$ npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

Then, update the scripts section of your `package.json` file to include the following:

```json
"scripts": {
  "test": "vitest run"
}
```

---

#### Step 2: Configure Vitest

Update `vitest.config.ts` file in your project root with the following configuration:

```ts
/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    globals: true,
  },
});
```

> **Note:**
> The `test` options in `vitest.config.ts` are essential for reliable testing inside Docker:
>
> - `environment: "jsdom"` simulates a browser-like environment for rendering and DOM interactions.
> - `setupFiles: "./src/setupTests.ts"` loads global configuration or mocks before each test file (optional but recommended).
> - `globals: true` enables global test functions like `describe`, `it`, and `expect` without importing them.
>
> For more details, see the official Vitest configuration docs.

#### Step 3: Update compose.yaml

Add a new service named `react-test` to your `compose.yaml` file. This service allows you to run your test suite in an isolated containerized environment.

```yaml
services:
  react-dev:
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

  react-prod:
    build:
      context: .
      dockerfile: Dockerfile
    image: docker-reactjs-sample
    ports:
      - "8080:8080"

  react-test:
    build:
      context: .
      dockerfile: Dockerfile.dev
    command: ["npm", "run", "test"]
```

The react-test service reuses the same `Dockerfile.dev` used for development and overrides the default command to run tests with `npm run test`. This setup ensures a consistent test environment that matches your local development configuration.

After completing the previous steps, your project directory should contain the following files:

```text
├── docker-reactjs-sample/
│ ├── Dockerfile
│ ├── Dockerfile.dev
│ ├── .dockerignore
│ ├── compose.yaml
│ └── nginx.conf
```

#### Step 4: Run the tests

To execute your test suite inside the container, run the following command from your project root:

```console
$ docker compose run --rm react-test
```

This command will:

- Start the `react-test` service defined in your `compose.yaml` file.
- Execute the `npm run test` script using the same environment as development.
- Automatically remove the container after the tests complete `docker compose run --rm` command.

> **Note:**
> For more information about Compose commands, see the Compose CLI
> reference.

---

### Summary

In this section, you learned how to run unit tests for your React.js application inside a Docker container using Vitest and Docker Compose.

What you accomplished:

- Installed and configured Vitest and React Testing Library for testing React components.
- Created a `react-test` service in `compose.yaml` to isolate test execution.
- Reused the development `Dockerfile.dev` to ensure consistency between dev and test environments.
- Ran tests inside the container using `docker compose run --rm react-test`.
- Ensured reliable, repeatable testing across environments without relying on local machine setup.

---

### Related resources

Explore official references and best practices to sharpen your Docker testing workflow:

- Dockerfile reference – Understand all Dockerfile instructions and syntax.
- Best practices for writing Dockerfiles – Write efficient, maintainable, and secure Dockerfiles.
- Compose file reference – Learn the full syntax and options available for configuring services in `compose.yaml`.
- `docker compose run` CLI reference – Run one-off commands in a service container.
