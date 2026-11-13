---
title: "Containerize a Next.js application (part 2 of 6)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/nextjs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Containerize a Next.js application (part 2 of 6)

## Containerize a Next.js Application

### Prerequisites

Before you begin, make sure the following tools are installed and available on your system:

- You have installed the latest version of Docker Desktop.
- You have a git client. The examples in this section use a command-line based git client, but you can use any client.

> **Note:**
> New to Docker? Start with the Docker basics guide to get familiar with key <example-value> like images, containers, and Dockerfiles.

---

### Overview

This guide walks you through containerizing a Next.js application with Docker.
You'll learn how to create a production-ready Docker image using best
practices that improve performance, security, scalability, and deployment
efficiency.

By the end of this guide, you will:

- Containerize a Next.js application using Docker.
- Create and optimize a Dockerfile for production builds.
- Use multi-stage builds to minimize image size.
- Leverage Next.js standalone or export output for efficient containerization.
- Follow best practices for building secure and maintainable Docker images.

---

### Get the sample application

Clone the sample application to use with this guide. Open a terminal, change
directory to a directory that you want to work in, and run the following command
to clone the git repository:

```console
$ git clone https://github.com/kristiyan-velkov/docker-nextjs-sample
```

---
