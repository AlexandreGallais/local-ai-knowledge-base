---
title: "Lab: Container-Supported Development"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/lab-container-supported-development.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Lab: Container-Supported Development

Use containers to run the services your app depends on — databases, caches,
message queues — without installing anything locally. This lab walks through
running PostgreSQL in a container, writing a `compose.yaml` your whole team
can share, and adding a pgAdmin visualizer to the dev stack.

## What you'll learn

By the end of this Labspace, you will have completed the following:

- Run a PostgreSQL database in a container with no local installation
- Use bind mounts to seed a database with schema and initial data at startup
- Write a `compose.yaml` that codifies the entire dev stack for the team
- Add a pgAdmin container to visualize and inspect the database
- Understand how containerized dev stacks reduce onboarding time and environment drift

## Modules

| #   | Module                           | Description                                                                     |
| --- | -------------------------------- | ------------------------------------------------------------------------------- |
| 1   | Introduction                     | Meet the sample app and understand the container-supported development approach |
| 2   | Running a Containerized Database | Start PostgreSQL, connect the app, and seed the database using bind mounts      |
| 3   | Making Life Easier with Compose  | Replace `docker run` commands with a shared `compose.yaml`                      |
| 4   | Adding Dev Tools                 | Add pgAdmin to the Compose stack for database visualization                     |
| 5   | Recap                            | Review key <example-value> and explore related guides                                 |
