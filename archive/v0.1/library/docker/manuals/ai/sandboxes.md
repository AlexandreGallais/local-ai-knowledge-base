---
title: "Docker Sandboxes"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/sandboxes/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Sandboxes

Docker Sandboxes run AI coding agents in isolated environments on your machine
or on Docker-managed cloud infrastructure. Use the `sbx` CLI to create and
manage either kind of sandbox.

The `sbx` CLI and local sandbox compute are free to use, including for commercial
work. Cloud compute uses a
pay-as-you-go subscription.
Model-provider charges are separate.

Organization admins can
centrally manage sandbox network, filesystem, and MCP policies,
for local sandboxes across developer machines.
Available on a separate paid subscription.

## Get started

Install the `sbx` CLI and sign in, then choose where to run your
agent:

| Environment | Use it for | Start here |
| --- | --- | --- |
| Local sandboxes | Work with files and supported hardware on your machine | Get started locally |
| Cloud sandboxes | Run on Docker-managed compute without local virtualization | Get started in the cloud |

The two environments have separate credentials, network policies, and lifecycle
controls. See Compare local and cloud sandboxes
before adapting a workflow.

To create and manage cloud sandboxes from your application, see
Sandboxes API and SDK.

## Learn more

The following guides describe local sandbox workflows. For cloud workflows,
see Cloud sandboxes.

- Agents — supported agents and per-agent configuration
- Workflows — patterns for Git, local development,
  authentication, agent skills, and automation
- Configuration — manage credentials, declare project
  environments, turn on GPU passthrough, and configure an upstream proxy
- Integrations — connect editors and apps like VS Code and
  Cursor to a sandbox over SSH
- MCP gateway — register MCP servers and connect them to
  sandboxed agents
- Kits — package tools and configuration into reusable
  sandbox environments
- Architecture — microVM isolation, workspace mounting,
  networking
- Security — isolation model, credential <example-value>, and
  network policies
- CLI reference — full list of `sbx` commands and options
- Troubleshooting — common issues and fixes
- FAQ — login requirements, telemetry, etc

## Feedback

Your feedback shapes what gets built next. If you run into a bug, hit a
missing feature, or have a suggestion, open an issue at
github.com/docker/sbx-releases/issues.
