---
title: "Lab: The Containerized SDLC"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/lab-containerized-sdlc.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Lab: The Containerized SDLC

Build a real Node.js API, then apply containers at every stage of the software
development lifecycle. You'll write a Compose file for local development,
integration tests using Testcontainers, a CI/CD pipeline, and Kubernetes
manifests — using the same container image throughout.

## What you'll learn

By the end of this Labspace, you will have completed the following:

- Set up a containerized local development environment with Docker Compose and Compose Watch
- Write integration tests that spin up a real database using Testcontainers
- Build a CI/CD pipeline that tests, builds, and pushes a container image automatically
- Write Kubernetes manifests and deploy a live application to a k3s cluster
- Configure the pipeline to cause an automatic deployment on every push to `main`

## Modules

| #   | Module                                    | Description                                                              |
| --- | ----------------------------------------- | ------------------------------------------------------------------------ |
| 1   | Introduction: Meet the App                | Tour the TaskFlow API and understand the SDLC journey ahead              |
| 2   | Local Dev with Docker Compose             | Write a `compose.yaml` to provision a local database and visualizer      |
| 3   | Containerizing Your Dev Environment       | Add the app to Compose with hot-reloading via Compose Watch              |
| 4   | Integration Testing with Testcontainers   | Write self-contained tests that start a real PostgreSQL container        |
| 5   | Continuous Integration with Gitea Actions | Build a pipeline that tests, builds, and pushes a container image        |
| 6   | Deploying to Kubernetes                   | Write manifests and deploy to a live k3s cluster with automated rollouts |
| 7   | The Containerized SDLC: A Recap           | Review the portability, consistency, and reproducibility gains           |
