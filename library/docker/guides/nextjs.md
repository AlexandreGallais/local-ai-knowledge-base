---
title: "Containerize a Next.js application (part 1 of 6)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/nextjs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

This guide shows you how to containerize a Next.js application using Docker, following best practices for creating efficient, production-ready containers.

Next.js is a React framework that enables server-side
rendering, static site generation, and full-stack capabilities. Docker
provides a consistent containerized environment from development to
production.

> **Acknowledgment**
>
> Docker extends its sincere gratitude to Kristiyan Velkov for authoring this guide and contributing the official Next.js Docker examples to the Vercel Next.js repository, including the standalone and export output examples. As a Docker Captain and experienced engineer, his expertise in Docker, DevOps, and modern web development has made this resource invaluable for the community, helping developers navigate and optimize their Docker workflows.

---

## What will you learn?

In this guide, you will learn how to:

- Containerize and run a Next.js application using Docker.
- Set up a local development environment for Next.js inside a container.
- Run tests for your Next.js application within a Docker container.

To begin, you'll start by containerizing an existing Next.js application.

---

## Prerequisites

Before you begin, make sure you're familiar with the following:

- Basic <example-value> of JavaScript or TypeScript.
- Basic <example-value> of Node.js and npm for managing dependencies and running scripts.
- Familiarity with React and Next.js fundamentals.
- Understanding of Docker concepts such as images, containers, and Dockerfiles. If you're new to Docker, start with the Docker basics guide.

Once you've completed the Next.js getting started modules, you'll be ready to containerize your own Next.js application using the examples and instructions provided in this guide.
