---
title: "React.js language-specific guide (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/reactjs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

The React.js language-specific guide shows you how to containerize a React.js application using Docker, following best practices for creating efficient, production-ready containers.

React.js is a widely used library for building interactive user interfaces. However, managing dependencies, environments, and deployments efficiently can be complex. Docker simplifies this process by providing a consistent and containerized environment.

> **Acknowledgment**
>
> Docker extends its sincere gratitude to Kristiyan Velkov for authoring this guide. As a Docker Captain and experienced Front-end engineer, his expertise in Docker, DevOps, and modern web development has made this resource invaluable for the community, helping developers navigate and optimize their Docker workflows.

---

## What will you learn?

In this guide, you will learn how to:

- Containerize and run a React.js application using Docker.
- Set up a local development environment for React.js inside a container.
- Run tests for your React.js application within a Docker container.

To begin, you’ll start by containerizing an existing React.js application.

---

## Prerequisites

Before you begin, make sure you're familiar with the following:

- Basic <example-value> of JavaScript or TypeScript.
- Basic <example-value> of Node.js and npm for managing dependencies and running scripts.
- Familiarity with React.js fundamentals.
- Understanding of Docker concepts such as images, containers, and Dockerfiles. If you're new to Docker, start with the Docker basics guide.

Once you've completed the React.js getting started modules, you’ll be ready to containerize your own React.js application using the examples and instructions provided in this guide.
