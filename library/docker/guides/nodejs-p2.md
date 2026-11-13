---
title: "Node.js language-specific guide (part 2 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/nodejs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Node.js language-specific guide (part 2 of 3)

## Use containers for Node.js development

### Prerequisites

Complete Containerize a Node.js application.

### Overview

Once your application runs in a container, the next step is making the container part of your everyday development workflow. Code changes should show up quickly, and services your app depends on, like databases, should run right alongside it.

In this section, you'll adapt the Dockerfile for local development by renaming the `builder` stage to `dev` and pointing Compose at it. You'll also update the application to connect to a PostgreSQL database, add a database service to `compose.yaml`, persist data in a named volume, enable Compose Watch so changes in your editor are picked up without a manual rebuild, and set up Node.js debugging so you can attach VS Code or Chrome DevTools to the running container.

### Update the application

You'll update your application to connect to a PostgreSQL database. Continue working in your `nodejs-docker-example` directory.

Replace `src/index.ts` and `package.json` with the following contents. The file browser shows only the files that change in this step.

> **Note:**
>
> The application won't run yet after this step. It tries to connect to a
> PostgreSQL database that doesn't exist. The next two sections add the
> database service and the Docker configuration needed to run everything
> together.

```typescript
// Express application backed by a PostgreSQL database.
// Creates a heroes table at startup.
// Endpoints: GET / (greeting), GET /health (health check), POST /heroes/ (create), GET /heroes/ (list).
// See https://expressjs.com/ and https://node-postgres.com/

import express, { type Request, type Response } from "express";
import { Pool } from "pg";
import { readFileSync } from "fs";

const app = express();
const port = parseInt(process.env.PORT ?? "3000", 10);

app.use(express.json());

function getPassword(): string {
  const passwordFile = process.env.POSTGRES_PASSWORD_FILE;
  if (passwordFile) {
    return readFileSync(passwordFile, "utf8").trim();
  }
  return process.env.POSTGRES_PASSWORD ?? "";
}

const pool = new Pool({
  host: process.env.POSTGRES_SERVER,
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: getPassword(),
});

pool
  .query(
    `CREATE TABLE IF NOT EXISTS heroes (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      secret_name TEXT NOT NULL,
      age INTEGER
    )`,
  )
  .catch(console.error);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.post("/heroes/", async (req: Request, res: Response) => {
  const { name, secret_name, age } = req.body as {
    name: string;
    secret_name: string;
    age?: number;
  };
  const result = await pool.query(
    "INSERT INTO heroes (name, secret_name, age) VALUES ($1, $2, $3) RETURNING *",
    [name, secret_name, age],
  );
  res.json(result.rows[0]);
});

app.get("/heroes/", async (_req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM heroes");
  res.json(result.rows);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

```json
{
  "name": "nodejs-docker-example",
  "version": "1.0.0",
  "description": "A minimal Node.js TypeScript application.",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts"
  },
  "dependencies": {
    "express": "^4.21.2",
    "pg": "^8.16.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.0.0",
    "@types/pg": "^8.11.0",
    "tsx": "^4.19.3",
    "typescript": "^5.8.3"
  }
}
```

### Update Docker assets

Replace `Dockerfile` and `compose.yaml` with the following.

```dockerfile
# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# This Dockerfile uses Docker Hardened Images (DHI) for enhanced security.
# For more information, see https://docs.docker.com/dhi/

# Development stage: install all dependencies, compile TypeScript, and
# serve with hot-reload. Used directly in development via compose.yaml.
FROM dhi.io/node:24-alpine3.23-dev AS dev

WORKDIR /app

# Install dependencies as a separate step to take advantage of Docker's
# caching. Leverage a cache mount to /root/.npm to speed up subsequent
# builds. Leverage a bind mount to package.json to avoid having to copy
# it into this layer.
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=bind,source=package.json,target=package.json \
    npm install
# Once you create a package-lock.json by running npm install locally, switch to npm ci and bind both files:
# RUN --mount=type=cache,target=/root/.npm \
#     --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     npm ci

# Copy the source code into the container and compile TypeScript.
COPY . .
RUN npm run build

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application in development mode.
CMD ["npm", "run", "dev"]

# Deps stage: install production dependencies only.
FROM dhi.io/node:24-alpine3.23-dev AS deps

WORKDIR /app

RUN --mount=type=cache,target=/root/.npm \
    --mount=type=bind,source=package.json,target=package.json \
    npm install --omit=dev
# Once you create a package-lock.json by running npm install locally, switch to npm ci and bind both files:
# RUN --mount=type=cache,target=/root/.npm \
#     --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     npm ci --omit=dev

# Runner stage: minimal runtime image with compiled app and production deps.
FROM dhi.io/node:24-alpine3.23 AS runner

ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=dev --chown=node:node /app/dist ./dist

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["node", "dist/index.js"]
```

```yaml
services:
  # Application service. The `target: dev` line builds the development
  # image (includes tsx and dev tooling); the runner stage of the
  # Dockerfile is unused in development.
  server:
    build:
      context: .
      target: dev
    ports:
      - 3000:3000
```

#### About these changes

The `builder` stage from containerize is renamed to `dev` and gains `EXPOSE 3000` and `CMD ["npm", "run", "dev"]`, which runs `tsx watch` for hot-reload. The `deps` and `runner` stages are unchanged.

In `compose.yaml`, the new `target: dev` line tells Compose to build and run the `dev` stage during development. Unlike the production image, the development image includes `tsx` and other dev tooling. If you need a shell in a running production container, use Docker Debug instead.

The build step runs `tsc`, which compiles each TypeScript file into a corresponding JavaScript file. esbuild is a popular alternative that bundles everything into a single output file and builds significantly faster. To switch, replace the `tsc` call in `package.json` with an esbuild command and update the `COPY --from=dev` path in the `runner` stage to match esbuild's output.

### Add a local database and persist data

You can use containers to set up local services, like a database. In this section, you'll update the `compose.yaml` file to define a database service and a volume to persist data, and add a `db/password.txt` file that holds the database password.

```yaml
services:
  # Application service. The `target: dev` line builds the development
  # image (includes tsx and dev tooling); the runner stage of the
  # Dockerfile is unused in development.
  server:
    build:
      context: .
      target: dev
    ports:
      - 3000:3000
    environment:
      - POSTGRES_SERVER=db
      - POSTGRES_USER=postgres
      - POSTGRES_DB=example
      - POSTGRES_PASSWORD_FILE=/run/secrets/db-password
    depends_on:
      db:
        condition: service_healthy
    secrets:
      - db-password
  # Database service. Reads the password from a Docker secret mounted at
  # /run/secrets/db-password. Compose waits for the healthcheck to pass
  # before starting the server, via the server's depends_on.
  db:
    image: dhi.io/postgres:18
    restart: always
    user: postgres
    secrets:
      - db-password
    volumes:
      - db-data:/var/lib/postgresql
    environment:
      - POSTGRES_DB=example
      - POSTGRES_PASSWORD_FILE=/run/secrets/db-password
    expose:
      - 5432
    healthcheck:
      test: ["CMD", "pg_isready"]
      interval: 10s
      timeout: 5s
      retries: 5
volumes:
  db-data:
secrets:
  db-password:
    file: db/password.txt
```

```text
mysecretpassword
```

> **Note:**
>
> To learn more about the instructions in the Compose file, see Compose file
> reference.

Now, run the following `docker compose up` command to start your application.

```console
$ docker compose up --build
```

Now test your API endpoint. Open a new terminal and make a request to the server using the curl commands.

Create an object with a POST request:

```console
$ curl -X 'POST' \
  'http://localhost:3000/heroes/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "my hero",
  "secret_name": "austing",
  "age": 12
}'
```

You should receive the following response:

```json
{
  "id": 1,
  "name": "my hero",
  "secret_name": "austing",
  "age": 12
}
```

Now make a GET request:

```console
$ curl http://localhost:3000/heroes/
```

You should receive the same response because it's the only object in the database.

Press `ctrl`+`c` in the terminal to stop your application.

### Automatically update services

Use Compose Watch to automatically update your running Compose services as you edit and save your code. For more details about Compose Watch, see Use Compose Watch.

Open your `compose.yaml` file in an IDE or text editor and add the highlighted Compose Watch instructions.

```yaml
services:
  # Application service. The `target: dev` line builds the development
  # image (includes tsx and dev tooling); the runner stage of the
  # Dockerfile is unused in development.
  server:
    build:
      context: .
      target: dev
    ports:
      - 3000:3000
    environment:
      - POSTGRES_SERVER=db
      - POSTGRES_USER=postgres
      - POSTGRES_DB=example
      - POSTGRES_PASSWORD_FILE=/run/secrets/db-password
    depends_on:
      db:
        condition: service_healthy
    secrets:
      - db-password
    develop:
      watch:
        - action: sync
          path: ./src
          target: /app/src
        - action: rebuild
          path: package.json
  db:
    image: dhi.io/postgres:18
    restart: always
    user: postgres
    secrets:
      - db-password
    volumes:
      - db-data:/var/lib/postgresql
    environment:
      - POSTGRES_DB=example
      - POSTGRES_PASSWORD_FILE=/run/secrets/db-password
    expose:
      - 5432
    healthcheck:
      test: ["CMD", "pg_isready"]
      interval: 10s
      timeout: 5s
      retries: 5
volumes:
  db-data:
secrets:
  db-password:
    file: db/password.txt
```

Run the following command to run your application with Compose Watch.

```console
$ docker compose watch
```

In a terminal, curl the application to get a response.

```console
$ curl http://localhost:3000
{"message":"Hello World"}
```

Any changes to the application's source files on your local machine will now be immediately reflected in the running container.

Open `nodejs-docker-example/src/index.ts` in an IDE or text editor and update the `Hello World` string by adding a few more exclamation marks.

```diff
-  res.json({ message: 'Hello World' });
+  res.json({ message: 'Hello World!!!' });
```

Save the changes to `src/index.ts` and then wait a few seconds for the application to reload. Curl the application again and verify that the updated text appears.

```console
$ curl http://localhost:3000
{"message":"Hello World!!!"}
```

Press `ctrl`+`c` in the terminal to stop your application.
