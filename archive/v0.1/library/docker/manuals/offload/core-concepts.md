---
title: "Core concepts"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/offload/core-concepts.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Core concepts

Docker Offload replaces the need to build or run containers locally by
connecting Docker Desktop to a cloud sandbox running its own Docker daemon.

When you run `docker offload create` or `docker --cloud <command>`:

1. Docker Offload provisions a cloud sandbox for your account.
2. Docker Desktop opens a secure tunnel to the Docker daemon in that sandbox.
3. Your Docker context switches to `docker-cloud`, so Docker commands run in the
   sandbox.
4. Builds and containers run on cloud hardware, and their output streams to
   your terminal.

Docker commands no longer reach your local daemon while your context is
`docker-cloud`. To run one against it, pass your local context with
`--context`. For more information, see Manage
sandboxes.

## Relationship to Docker Sandboxes

Docker Offload runs on the same cloud infrastructure as cloud
sandboxes in Docker Agentic Platform.

A sandbox that Docker Offload creates belongs to your account and appears in
the Docker Agentic Platform Console with a name that starts with `offload-`.

## Cloud resources

You can choose the size of a sandbox when Docker Offload creates it, using
`--cpus` and `--memory`. For the available sizes, see Choose the size of a new
cloud sandbox.

The default is 4 vCPUs and 8 GiB of memory.

## Session lifecycle

A Docker Offload sandbox moves between a running state and a paused state.

- Running: The sandbox is connected and billable. Builds and containers execute
  on cloud hardware.
- Paused: The sandbox is suspended and isn't billed. Its containers, images,
  and volumes are preserved.

Your sandbox pauses when you run `docker offload stop`, or automatically after
a period without activity. By default, that period is 5 minutes. Docker Offload
takes a short time to notice that a sandbox has gone quiet, so an automatic
pause begins a little after the timeout rather than exactly on it. Pausing
itself takes several minutes to complete.

You don't resume a sandbox explicitly. Running a command that needs the sandbox
or one of its containers resumes it. Resuming restores the sandbox's exact
previous state: containers that were running resume, data written to volumes
and container filesystems is still there, and build logs from an earlier
session remain available. For which commands resume a sandbox and what's
unavailable while it's paused, see Resume a
sandbox.

Two separate timers govern the sandbox, because idle detection runs on the
machine that's connected to it:

- The idle timeout pauses the sandbox when your machine is awake but you're not
  running anything. You can change it with `--idle-timeout`, or turn it off
  with `--keep-alive`.
- The time to live applies when no machine is connected, such as when your
  machine sleeps or goes offline. Docker Offload keeps renewing it while a
  machine is connected.

For how to set both, see Control when your sandbox
pauses.

## Working from more than one machine

You can connect to the same sandbox from more than one machine. A second
`docker offload create` connects to your existing sandbox rather than creating
another one, so both machines report the same sandbox ID.

Each connection keeps its own session timer and its own idle detection, so the
two machines can report different times until idle. For more information, see
Connect from more than one
machine.

## Comparison with Docker Offload v1

| | Docker Offload | Docker Offload v1 |
| --- | --- | --- |
| Subscription | Docker Agentic Platform, purchased by individual developers | Docker Offload, purchased by an organization and a Teams or Business subscription. |
| Start with | `docker --cloud <command>` or `docker offload create` | `docker offload start`, or the Dashboard toggle |
| On stop | Sandbox pauses and keeps its state | Environment is terminated and its contents are deleted |
| Multiple machines | Connect to the same sandbox from more than one machine | One session per user at a time |
| Billing | Metered for the time the sandbox runs | Covered by the organization's subscription, subject to fair use |

Both versions use the `docker-cloud` Docker context, so scripts and tooling
that reference it by name keep working.

## What's next

Get hands-on with Docker Offload by following the Docker Offload
quickstart.

For the commands you use day to day, see Manage
sandboxes.
