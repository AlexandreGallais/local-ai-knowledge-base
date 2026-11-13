---
title: "Audit logs"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/governance/organization/audit/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Audit logs

Your organization's policies decide what sandboxes can do. Audit logs show you
what happened: each time a policy decides a request from a governed
developer's sandbox, a record captures who made the request, what it was, and
what the policy decided. You can review the records in Docker Home,
export them, forward them to your SIEM, or collect them from each machine.

This page explains what audit logs record, where records go, and what you can
do with them.

> **Note:**
> Audit logs cover local sandboxes, the sandboxes that run on developers'
> machines. Audit logs don't cover cloud sandboxes. For cloud network
> decisions, see
> Cloud policy logs.

## What audit logs record

Audit logs cover two kinds of events from Docker Sandboxes: the policy decision
made for each request, and sandbox session lifecycle events.

Records contain metadata only, such as who made a request, what it targeted,
and what the policy decided. They never contain prompt content, agent output,
or parameter values. For every field a record can contain, see the
Audit record reference.

Records come only from developers your organization governs: signed-in users
who have an AI Governance license and for whom an organization policy is
enforced. Other users don't generate audit records, so they don't appear in
audit events or SIEM forwarding output.

## Delivery modes

Docker supports two delivery modes for audit records:

- **Local disk**: the sandbox daemon writes JSON Lines (`.jsonl`)
  files on each host. Use this mode for host-local retention, air-gapped
  collection, or collection through your own log shipper.
- **Docker Cloud**: Docker stores audit records in Docker Cloud. Cloud
  delivery powers the hosted audit log view, CSV export, SIEM streaming, and
  the Audit Logs API.

To choose which delivery modes your organization uses, see
Configure audit delivery.

### Where records are stored

With local delivery, the sandbox daemon on each machine writes audit records to
its audit directory. Local files stay on the host that produced them, whether
cloud delivery is on or off.

The directory follows each operating system's convention for application logs:

| OS      | Default path                                                      |
| ------- | ----------------------------------------------------------------- |
| macOS   | `~/Library/Logs/com.docker.sandboxes/sandboxes/auditkit/`         |
| Linux   | `${XDG_STATE_HOME:-~/.local/state}/sandboxes/sandboxes/auditkit/` |
| Windows | `%LOCALAPPDATA%\DockerSandboxes\sandboxes\logs\auditkit\`         |

Each file is named `audit-<utc-timestamp>-<process-uuid>-<seq>.jsonl`. The
daemon writes records to a temporary `.tmp` file first, then renames it to
`.jsonl` when it reaches a rotation threshold or shuts down cleanly. By
default, the threshold is 5 minutes, 1000 events, or 50 MiB, whichever comes
first. Collect only `.jsonl` files, because `.tmp` files are still being
written.

Docker Sandboxes never deletes `.jsonl` files, so retention and cleanup are up
to your log shipper or your own housekeeping.

## What you can do with records

How you use audit records depends on where they go:

- With cloud delivery, view and export events in
  Docker Home, forward them to your SIEM, and
  retrieve them with the Audit Logs API. The hosted view, CSV export,
  SIEM forwarding, and the API all require cloud delivery. Local
  delivery alone doesn't power them.
- With local delivery, collect the `.jsonl` files from each machine with your
  own log shipper. For more details, see
  Collect local audit files with a log shipper.

## Data handling

When cloud delivery is on, Docker stores audit records in Docker
Cloud for 90 days. For legal and privacy terms that govern Docker services, see
Docker's
Terms of Service and
Privacy Policy.
