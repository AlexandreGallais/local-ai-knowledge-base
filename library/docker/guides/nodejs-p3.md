---
title: "Node.js language-specific guide (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/nodejs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Node.js language-specific guide (part 3 of 3)

### Debug your application

`tsx watch` supports the Node.js inspector protocol, so you can attach a debugger from VS Code or Chrome DevTools and set breakpoints directly in your TypeScript source files.

Update the `dev` script in `package.json` to start the inspector. The `--inspect=0.0.0.0:9229` flag tells Node.js to listen for debugger connections on all network interfaces at port 9229. Using `0.0.0.0` rather than `localhost` is necessary so the debugger is reachable from outside the container. Also expose the debug port in `compose.yaml`, and add a `.vscode/launch.json` file that tells VS Code how to attach to the running inspector.

```json
{
  "name": "nodejs-docker-example",
  "version": "1.0.0",
  "description": "A minimal Node.js TypeScript application.",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch --inspect=0.0.0.0:9229 src/index.ts"
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

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Docker Container",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/app",
      "protocol": "inspector",
      "restart": true,
      "sourceMaps": true,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
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
      - 9229:9229
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

Rebuild and restart with the updated configuration:

```console
$ docker compose up --build
```

When the inspector is ready, you'll see a line like the following in the logs:

```text
Debugger listening on ws://0.0.0.0:9229/...
```

#### VS Code

With `.vscode/launch.json` in place, attach the debugger using the Debug panel.

Open the Debug panel (`Ctrl+Shift+D` on Windows and Linux, `Cmd+Shift+D` on Mac), select **Attach to Docker Container**, and press `F5`. You can now set breakpoints in your TypeScript source files under `src/`.

#### Chrome DevTools

You can also use the built-in Node.js inspector in Chrome without any editor setup.

1. Open Chrome and go to `chrome://inspect`.

2. Select **Configure** and add `localhost:9229`.

3. When your Node.js target appears in the list, select **inspect**.

#### Troubleshoot the debugger

If the debugger doesn't connect, verify the container is running and the port is mapped correctly:

```console
$ docker compose ps
$ docker compose logs server
```

The logs should include a line like:

```text
Debugger listening on ws://0.0.0.0:9229/...
```

If that line is missing, confirm the `dev` script in `package.json` includes `--inspect=0.0.0.0:9229` and that `9229:9229` appears in the `ports` list for the `server` service in `compose.yaml`.

For more details about Node.js debugging, see the Node.js debugging guide.

## Run Node.js tests in a container

### Prerequisites

Complete all the previous sections of this guide, starting with Containerize a Node.js application.

### Overview

Testing is a core part of building reliable software. Docker makes it easy to
run your tests in the same environment used in CI and production, so failures
are caught before they reach your users.

In this section, you'll add Vitest to the project and
run tests both locally and inside a container.

### Update the application

You'll refactor `src/index.ts` to export the Express `app` instance so tests
can import it without starting a server. Add a test file and update
`package.json` to add Vitest and a test runner for HTTP requests. The file browser shows only the files that change in this step.

```typescript
// Express application backed by a PostgreSQL database.
// Creates a heroes table at startup.
// Endpoints: GET / (greeting), GET /health (health check), POST /heroes/ (create), GET /heroes/ (list).
// See https://expressjs.com/ and https://node-postgres.com/

import express, { type Request, type Response } from "express";
import { Pool } from "pg";
import { readFileSync } from "fs";

export const app = express();
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

if (process.env.POSTGRES_SERVER) {
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
}

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

// Only start the server when this file is run directly.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
```

```typescript
// Unit tests for the Express application.
// Tests the root endpoint without starting a server.
// See https://vitest.dev/ for the test framework reference.

import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "./index";

describe("GET /", () => {
  it("returns a JSON greeting", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello World" });
  });
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
    "dev": "tsx watch src/index.ts",
    "test": "vitest run"
  },
  "dependencies": {
    "express": "^4.21.2",
    "pg": "^8.16.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.0.0",
    "@types/pg": "^8.11.0",
    "supertest": "^7.0.0",
    "@types/supertest": "^6.0.0",
    "tsx": "^4.19.3",
    "typescript": "^5.8.3",
    "vitest": "^3.0.0"
  }
}
```

### Run tests locally

Run the following command to run the tests locally:

```console
$ npm install
$ npm test
```

You should see output like the following:

```console
 RUN  v3.0.0 /app

 ✓ src/index.test.ts (1)
   ✓ GET / (1)
     ✓ returns a JSON greeting

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  12:00:00
   Duration  500ms
```

### Run tests in a container

Run the tests using the dev stage of your Dockerfile:

```console
$ docker compose run --build --rm --no-deps server npm test
```

The `--no-deps` flag skips starting the database, since the unit tests don't require it. The `--rm` flag removes the container when the tests finish.

You should see the same test output as when running locally.

### Run tests when building

To run tests during the Docker build process, add a `test` stage to your Dockerfile that runs after the dev stage.

```dockerfile
FROM dhi.io/node:24-alpine3.23-dev AS dev

WORKDIR /app

RUN --mount=type=cache,target=/root/.npm \
    --mount=type=bind,source=package.json,target=package.json \
    npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM dhi.io/node:24-alpine3.23-dev AS deps
WORKDIR /app
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=bind,source=package.json,target=package.json \
    npm install --omit=dev

FROM dhi.io/node:24-alpine3.23 AS runner
ENV PATH=/app/node_modules/.bin:$PATH
WORKDIR /app
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=dev --chown=node:node /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]

FROM dev AS test

ENV CI=true

CMD ["npm", "test"]
```

Then build and run the test stage:

```console
$ docker build --target test -t nodejs-app-test .
$ docker run --rm nodejs-app-test
```

### Summary

In this section, you learned how to run tests when developing locally and inside a container.

Related information:

- Dockerfile reference
- Compose file reference
- `docker compose run` CLI reference
