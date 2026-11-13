---
title: "Use the Docker Desktop CLI"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/features/desktop-cli.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Use the Docker Desktop CLI

The Docker Desktop CLI lets you perform key operations such as starting, stopping, restarting, and updating Docker Desktop directly from the command line.

The Docker Desktop CLI provides:

- Simplified automation for local development: Execute Docker Desktop operations more efficiently in scripts and tests.
- An improved developer experience: Restart, quit, or reset Docker Desktop from the command line, reducing dependency on the Docker Desktop Dashboard and improving flexibility and efficiency.

## Usage

```console
docker desktop COMMAND [OPTIONS]
```

## Commands

| Command              | Description                              |
|:---------------------|:-----------------------------------------|
| `start`              | Starts Docker Desktop                    |
| `stop`               | Stops Docker Desktop                     |
| `restart`            | Restarts Docker Desktop                  |
| `status`             | Displays whether Docker Desktop is running or stopped       |
| `engine ls`          | Lists available engines (Windows only)   |
| `engine use`         | Switch between Linux and Windows containers (Windows only) |
| `update`             | Manage Docker Desktop updates |
| `logs`               | Print log entries                        |
| `disable`            | Disable a feature                        |
| `enable`             | Enable a feature                         |
| `version`            | Show the Docker Desktop CLI plugin version information |
| `kubernetes`         | Manage Kubernetes    |
| `diagnose`           | Diagnose Docker Desktop and upload the diagnostics. |
| `auth status`        | Show the current Docker Hub authentication status. Available with version 4.95 and later. |

For more details on each command, see the Docker Desktop CLI reference.
