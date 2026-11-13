---
title: "Docker Skills"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/skills/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Skills

Docker Skills are Docker's official, open-source guidance for compatible AI
coding agents. They help agents with Docker tasks, such as improving a Dockerfile,
setting up a Compose application, or answering questions using official Docker
documentation. The collection evolves and doesn't cover every Docker product.
Browse the repository catalog for
available skills and their descriptions.

## Get started

1. Install Docker Skills with a method supported by your agent,
   and start a new agent session.
2. Ask for an outcome in plain language, for example, “Make this Dockerfile
   smaller and run as a non-root user.”
3. Review the proposed changes and commands, run your project's tests, and
   confirm destructive operations before approving them. Skills guide the
   agent; they don't replace validation.

## How agents use skills

A compatible agent matches your request to descriptions of skills it can
access, then loads the relevant instructions. You don't need to name a skill in
your prompt. A skill is a directory containing a `SKILL.md` file that describes
when and how to use it, with optional references or assets. An agent can use
more than one skill when a task spans Docker products.
