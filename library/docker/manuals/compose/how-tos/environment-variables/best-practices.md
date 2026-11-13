---
title: "Best practices for working with environment variables in Docker Compose"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/compose/how-tos/environment-variables/best-practices.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Best practices for working with environment variables in Docker Compose

#### Handle sensitive information securely

Be cautious about including sensitive data in environment variables. Consider using Secrets for managing sensitive information.

#### Understand environment variable precedence

Be aware of how Docker Compose handles the precedence of environment variables from different sources (`.env` files, shell variables, Dockerfiles).

#### Use specific environment files

Consider how your application adapts to different environments. For example development, testing, production, and use different `.env` files as needed.

#### Know interpolation

Understand how interpolation works within compose files for dynamic configurations.

#### Command line overrides

Be aware that you can override environment variables from the command line when starting containers. This is useful for testing or when you have temporary changes.
