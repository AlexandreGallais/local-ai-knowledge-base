---
title: "Docker Offload"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/offload/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Offload

Docker Offload is a fully managed service that lets you offload building and
running containers to the cloud using the Docker tools you already know. It
runs your containers in a cloud sandbox instead of on your local machine, so
you can work on hardware that can't run your workload, in virtual desktop
infrastructure (VDI) environments, or on systems that don't support nested
virtualization.

## Key features

- Cloud sandboxes that persist: Your containers, images, and volumes survive
  pausing and resuming, so you can pick up a long-running workload where you
  left off.
- Familiar commands: Run the Docker CLI and Docker Compose commands you already
  use. Your context determines where they run.
- Port forwarding and file sync: Reach ports published in the sandbox from your
  machine, and work with bind-mounted files, as you would with local
  containers.
- Secure communication: Use encrypted tunnels between Docker Desktop and the
  cloud sandbox, with support for secure secrets and image pulling.
- Usage-based billing: Pay for the time your sandbox runs, not for the time it
  spends paused.
- VDI-friendly: Use Docker Desktop in
  virtual desktop environments or systems that don't support nested
  virtualization.

Docker Offload is for individual developers, and it's included with a Docker
Agentic Platform subscription. You pay for the time your cloud sandbox runs.

> **Note:**
>
> If you start Docker Offload with `docker offload start`, or with the cloud toggle
> in the Docker Desktop Dashboard header, your organization subscribes to
> Docker Offload v1. To use the latest version of Docker Offload,
> see Move to the current version of Docker
> Offload.

In the following topics, learn about Docker Offload, how to set it up, use it
for your workflows, and troubleshoot common issues.
