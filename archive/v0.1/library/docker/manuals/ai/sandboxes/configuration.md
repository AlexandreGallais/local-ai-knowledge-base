---
title: "Configure Docker Sandboxes"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/configuration/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Configure Docker Sandboxes

Configure credentials and how Docker Sandboxes run for a project, host, or
network environment. These settings control sandbox creation, authentication,
and connectivity. To change the tools and agent configuration inside a
sandbox, see Customize.

- Settings lists host-level settings, environment variable
  equivalents, and commands to inspect and change values.
- Credentials <example-value> API keys, authentication
  credentials, and registry access for sandboxed agents.
- Models selects local models, hosted providers, or custom
  inference endpoints for sandboxed agents.
- Environment files declare reusable project
  configuration in `sbxenv.yaml` for local or cloud sandboxes.
- GPU passthrough configures a Linux host and sandbox for
  NVIDIA GPU workloads.
- Registry mirror routes Docker Hub template, kit, and
  in-sandbox Docker image pulls through an organization's registry mirror.
- Upstream proxy routes sandbox and daemon traffic through
  an operating system or corporate proxy.
