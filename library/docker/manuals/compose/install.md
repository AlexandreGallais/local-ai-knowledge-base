---
title: "Overview of installing Docker Compose"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/compose/install/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Overview of installing Docker Compose

This page summarizes the different ways you can install Docker Compose, depending on your platform and needs.

## Installation scenarios

### Docker Desktop (Recommended)

The easiest and recommended way to get Docker Compose is to install Docker Desktop.

Docker Desktop includes Docker Compose along with Docker Engine and Docker CLI which are Compose prerequisites.

Docker Desktop is available for:
- Linux
- Mac
- Windows

> **Tip:**
>
> If you have already installed Docker Desktop, you can check which version of Compose you have by selecting **About Docker Desktop** from the Docker menu .

### Plugin (Linux only)

> **Important:**
>
> This method is only available on Linux.

If you already have Docker Engine and Docker CLI installed, you can install the Docker Compose plugin from the command line, by either:
- Using Docker's repository
- Downloading and installing manually

### Standalone (Legacy)

> **Warning:**
>
> This install scenario is not recommended and is only supported for backward compatibility purposes.

You can install the Docker Compose standalone on Linux or on Windows Server.
