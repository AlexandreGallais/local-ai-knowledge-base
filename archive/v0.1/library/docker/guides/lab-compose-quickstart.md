---
title: "Lab: Docker Compose Quickstart"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/lab-compose-quickstart.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Lab: Docker Compose Quickstart

Build a Python Flask and Redis hit-counter app using Docker Compose, starting
from a bare `compose.yaml` and progressively adding production-quality
features at each step.

## What you'll learn

By the end of this Labspace, you will have completed the following:

- Define a multi-service application in a `compose.yaml` file and manage it with Compose commands
- Control service startup order using health checks and `depends_on` conditions
- Iterate on code without manual rebuilds using Compose watch mode
- Persist data across container restarts with named volumes
- Modularize a stack across multiple files using the `include` directive
- Use `config`, `logs`, and `exec` to inspect and debug a running stack

## Modules

| #   | Module                           | Description                                                           |
| --- | -------------------------------- | --------------------------------------------------------------------- |
| 1   | Introduction                     | Tour the starter app and verify the environment                       |
| 2   | Defining Services                | Write the first `compose.yaml` and bring up the Flask and Redis stack |
| 3   | Health Checks & Startup Order    | Add a Redis healthcheck and `depends_on` to eliminate race conditions |
| 4   | Live Development with Watch Mode | Configure watch mode to sync code changes without manual rebuilds     |
| 5   | Persistence & Debugging          | Add a named volume so Redis data survives `docker compose down`       |
| 6   | Using Multiple Compose Files     | Extract Redis into `infra.yaml` and compose files with `include`      |
| 7   | Additional Commands              | Use `config`, `logs -f`, and `exec` to inspect the running stack      |
| 8   | Recap                            | Review what was built and explore next steps                          |
